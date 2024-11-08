using Barcoding.Core.Models.Account;
using Barcoding.Core.Services.Account.Interfaces;
using Barcoding.Server.Configuration;
using Barcoding.Server.Services;
using Barcoding.Server.Services.Email;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Barcoding.Server.OIDC
{
    public class OidcUserManager
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserAccountService _userAccountService;
        private readonly IHttpContextAccessor _httpContext;
        private readonly UserAccountEmailSender _emailSender;
        private readonly string _publicRoleName;

        public OidcUserManager(
            UserManager<ApplicationUser> userManager,
            IUserAccountService userAccountService,
            IHttpContextAccessor httpContextAccessor,
            UserAccountEmailSender emailSender,
            IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            _userAccountService = userAccountService;
            _httpContext = httpContextAccessor;
            _emailSender = emailSender;
            _publicRoleName = appSettings.Value.DefaultUserRole;
        }

        public async Task<UserResolutionResult> FindOrCreateAsync(string provider, string providerUserId,
            string email, IEnumerable<Claim>? claims = null, string? password = null)
        {
            ArgumentNullException.ThrowIfNull(provider);

            ArgumentNullException.ThrowIfNull(providerUserId);

            var user = await _userManager.FindByLoginAsync(provider, providerUserId);

            if (user != null)
            {
                return new UserResolutionResult(user);
            }
            else if (!string.IsNullOrWhiteSpace(email))
            {
                user = await _userManager.FindByEmailAsync(email);

                if (user != null)
                {
                    if (string.IsNullOrWhiteSpace(password))
                    {
                        return new UserResolutionResult($"User with email '{email}' already exists.",
                            new() { { "email", email } });
                    }
                    else if (!await _userManager.CheckPasswordAsync(user, password))
                    {
                        if (_userManager.SupportsUserLockout)
                            await _userManager.AccessFailedAsync(user);

                        return new UserResolutionResult("Invalid password.");
                    }
                }
                else
                {
                    user = await CreateUserAsync(email, email, claims);
                }

                var result = await _userManager.AddLoginAsync(user,
                    new UserLoginInfo(provider, providerUserId, provider));

                if (result.Succeeded)
                    return new UserResolutionResult(user);
                else
                    throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return new UserResolutionResult("Invalid request details.");
        }

        private async Task<ApplicationUser> CreateUserAsync(string username, string email,
            IEnumerable<Claim>? claims = null)
        {
            var user = new ApplicationUser { UserName = username, Email = email, IsEnabled = true };
            if (claims != null)
                user.FullName = claims.FirstOrDefault(c => c.Type == Claims.Name)?.Value;

            var createResult = await _userManager.CreateAsync(user);

            if (!createResult.Succeeded)
                throw new Exception(string.Join(", ", createResult.Errors.Select(e => e.Description)));

            var updateResult = await _userAccountService.UpdateUserAsync(user, new[] { _publicRoleName });
            if (updateResult.Succeeded)
                await SendVerificationEmail(user);

            return user;
        }

        private async Task SendVerificationEmail(ApplicationUser appUser)
        {
            if (_httpContext.HttpContext is null)
                throw new InvalidOperationException("HttpContext is not available.");

            var code = await _userAccountService.GenerateEmailConfirmationTokenAsync(appUser);
            var baseUrl = Utilities.GetBaseUrl(_httpContext.HttpContext.Request);

            await _emailSender.SendEmailConfirmationEmailAsync(baseUrl, code, appUser.Id, appUser.UserName!,
                appUser.Email!);
        }
    }
}
