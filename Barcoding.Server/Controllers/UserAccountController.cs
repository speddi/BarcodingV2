using AutoMapper;
using Barcoding.Core.Models.Account;
using Barcoding.Core.Services.Account.Interfaces;
using Barcoding.Server.Authorization;
using Barcoding.Server.Configuration;
using Barcoding.Server.Services;
using Barcoding.Server.Services.Email;
using Barcoding.Server.ViewModels.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Barcoding.Core.Services.Account;
using Barcoding.Core.Services.Account.Exceptions;

namespace Barcoding.Server.Controllers
{
    [Route("api/account")]
    [Authorize]
    public class UserAccountController : BaseApiController
    {
        private readonly IUserAccountService _userAccountService;
        private readonly IAuthorizationService _authorizationService;
        private readonly UserAccountEmailSender _emailSender;
        private readonly string _publicRoleName;

        public UserAccountController(ILogger<UserAccountController> logger, IMapper mapper,
            IUserAccountService userAccountService, IAuthorizationService authorizationService,
            UserAccountEmailSender emailSender, IOptions<AppSettings> appSettings) : base(logger, mapper)
        {
            _userAccountService = userAccountService;
            _authorizationService = authorizationService;
            _emailSender = emailSender;
            _publicRoleName = appSettings.Value.DefaultUserRole;
        }

        [HttpGet("users/me")]
        [ProducesResponseType(200, Type = typeof(UserVM))]
        public async Task<IActionResult> GetCurrentUser()
        {
            return await GetUserById(GetCurrentUserId());
        }

        [HttpGet("users/{id}", Name = nameof(GetUserById))]
        [ProducesResponseType(200, Type = typeof(UserVM))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetUserById(string id)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, id,
                UserAccountManagementOperations.ReadOperationRequirement)).Succeeded)
                return new ChallengeResult();

            var userVM = await GetUserViewModelHelper(id);

            if (userVM != null)
                return Ok(userVM);

            return NotFound(id);
        }

        [HttpGet("users/haspassword/{id}")]
        [ProducesResponseType(200, Type = typeof(bool))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetUserHasPasswordById(string id)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, id,
                UserAccountManagementOperations.ReadOperationRequirement)).Succeeded)
                return new ChallengeResult();

            var appUser = await _userAccountService.GetUserByIdAsync(id);
            if (appUser != null)
            {
                var userHasPassword = await _userAccountService.GetUserHasPasswordAsync(appUser);
                return Ok(userHasPassword);
            }

            return NotFound(id);
        }

        [HttpGet("users/username/{userName}")]
        [ProducesResponseType(200, Type = typeof(UserVM))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetUserByUserName(string userName)
        {
            var appUser = await _userAccountService.GetUserByUserNameAsync(userName);

            if (!(await _authorizationService.AuthorizeAsync(User, appUser?.Id ?? string.Empty,
                UserAccountManagementOperations.ReadOperationRequirement)).Succeeded)
                return new ChallengeResult();

            var userVM = appUser != null ? await GetUserViewModelHelper(appUser.Id) : null;

            if (userVM != null)
                return Ok(userVM);

            return NotFound(userName);
        }

        [HttpGet("users")]
        [Authorize(AuthPolicies.ViewAllUsersPolicy)]
        [ProducesResponseType(200, Type = typeof(List<UserVM>))]
        public async Task<IActionResult> GetUsers()
        {
            return await GetUsers(-1, -1);
        }

        [HttpGet("users/{pageNumber:int}/{pageSize:int}")]
        [Authorize(AuthPolicies.ViewAllUsersPolicy)]
        [ProducesResponseType(200, Type = typeof(List<UserVM>))]
        public async Task<IActionResult> GetUsers(int pageNumber, int pageSize)
        {
            var usersAndRoles = await _userAccountService.GetUsersAndRolesAsync(pageNumber, pageSize);

            var usersVM = new List<UserVM>();

            foreach (var item in usersAndRoles)
            {
                var userVM = _mapper.Map<UserVM>(item.User);
                userVM.Roles = item.Roles;

                usersVM.Add(userVM);
            }

            return Ok(usersVM);
        }

        [HttpPut("users/me")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> UpdateCurrentUser([FromBody] UserEditVM user)
        {
            var userId = GetCurrentUserId($"Error retrieving the userId for user \"{user.UserName}\".");
            return await UpdateUser(userId, user);
        }

        [HttpPut("users/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserEditVM user)
        {
            var appUser = await _userAccountService.GetUserByIdAsync(id);
            var currentRoles = appUser != null
                ? (await _userAccountService.GetUserRolesAsync(appUser)).ToArray() : null;

            var manageUsersPolicy = _authorizationService.AuthorizeAsync(User, id,
                UserAccountManagementOperations.UpdateOperationRequirement);
            var assignRolePolicy = _authorizationService.AuthorizeAsync(User, (user.Roles, currentRoles),
                AuthPolicies.AssignAllowedRolesPolicy);

            if ((await Task.WhenAll(manageUsersPolicy, assignRolePolicy)).Any(r => !r.Succeeded))
                return new ChallengeResult();

            if (appUser == null)
                return NotFound(id);

            if (!string.IsNullOrWhiteSpace(user.Id) && id != user.Id)
                AddModelError("Conflicting user id in parameter and model data.", nameof(id));

            var isNewPassword = !string.IsNullOrWhiteSpace(user.NewPassword);
            var isNewUserName = !appUser.UserName!.Equals(user.UserName, StringComparison.OrdinalIgnoreCase);
            var isConfirmedEmailChanged = !appUser.Email!.Equals(user.Email, StringComparison.OrdinalIgnoreCase)
                && appUser.EmailConfirmed;

            var userHasPassword = await _userAccountService.GetUserHasPasswordAsync(appUser);

            if (userHasPassword && GetCurrentUserId() == id)
            {
                if (string.IsNullOrWhiteSpace(user.CurrentPassword))
                {
                    if (isNewPassword)
                        AddModelError("Current password is required when changing your own password.", "Password");

                    if (isNewUserName)
                        AddModelError("Current password is required when changing your own username.", "Username");

                    if (isConfirmedEmailChanged)
                        AddModelError("Current password is required when changing your own email address.", "Email");
                }
                else if (isNewPassword || isNewUserName || isConfirmedEmailChanged)
                {
                    if (!await _userAccountService.CheckPasswordAsync(appUser, user.CurrentPassword))
                        AddModelError("The username/password couple is invalid.");
                }
            }

            if (ModelState.IsValid)
            {
                _mapper.Map(user, appUser);
                appUser.EmailConfirmed = !isConfirmedEmailChanged && appUser.EmailConfirmed;

                var result = await _userAccountService.UpdateUserAsync(appUser, user.Roles);

                if (result.Succeeded)
                {
                    if (isConfirmedEmailChanged)
                        await SendVerificationEmail(appUser);

                    if (isNewPassword)
                    {
                        if (userHasPassword && !string.IsNullOrWhiteSpace(user.CurrentPassword))
                            result = await _userAccountService.UpdatePasswordAsync(appUser, user.CurrentPassword,
                                user.NewPassword!);
                        else
                            result = await _userAccountService.ResetPasswordAsync(appUser, user.NewPassword!);
                    }

                    if (result.Succeeded)
                        return NoContent();
                }

                AddModelError(result.Errors);
            }

            return BadRequest(ModelState);
        }

        [HttpPatch("users/me")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> UpdateCurrentUser([FromBody] JsonPatchDocument<UserPatchVM> patch)
        {
            return await UpdateUser(GetCurrentUserId(), patch);
        }

        [HttpPatch("users/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] JsonPatchDocument<UserPatchVM> patch)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, id,
                UserAccountManagementOperations.UpdateOperationRequirement)).Succeeded)
                return new ChallengeResult();

            var appUser = await _userAccountService.GetUserByIdAsync(id);
            if (appUser == null)
                return NotFound(id);

            var userPVM = _mapper.Map<UserPatchVM>(appUser);
            patch.ApplyTo(userPVM, e => AddModelError(e.ErrorMessage));

            if (ModelState.IsValid)
            {
                _mapper.Map(userPVM, appUser);

                var result = await _userAccountService.UpdateUserAsync(appUser);

                if (result.Succeeded)
                    return NoContent();

                AddModelError(result.Errors);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("users")]
        [Authorize(AuthPolicies.ManageAllUsersPolicy)]
        [ProducesResponseType(201, Type = typeof(UserVM))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public async Task<IActionResult> Register([FromBody] UserEditVM user)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, (user.Roles, Array.Empty<string>()),
                AuthPolicies.AssignAllowedRolesPolicy)).Succeeded)
                return new ChallengeResult();

            if (string.IsNullOrWhiteSpace(user.NewPassword))
                AddModelError($"{nameof(user.NewPassword)} is required when registering a new user.",
                    nameof(user.NewPassword));

            if (user.Roles == null)
                AddModelError($"{nameof(user.Roles)} is required when registering a new user.", nameof(user.Roles));

            if (ModelState.IsValid)
            {
                var appUser = _mapper.Map<ApplicationUser>(user);
                var result = await _userAccountService.CreateUserAsync(appUser, user.Roles!, user.NewPassword!);

                if (result.Succeeded)
                {
                    await SendVerificationEmail(appUser);

                    var userVM = await GetUserViewModelHelper(appUser.Id);
                    return CreatedAtAction(nameof(GetUserById), new { id = userVM?.Id }, userVM);
                }

                AddModelError(result.Errors);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("public/users")]
        [AllowAnonymous]
        [ProducesResponseType(201, Type = typeof(UserVM))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> PublicRegister([FromBody] UserPublicRegisterVM user)
        {
            var appUser = _mapper.Map<ApplicationUser>(user);
            var result = await _userAccountService
                .CreateUserAsync(appUser, new string[] { _publicRoleName }, user.NewPassword);

            if (result.Succeeded)
            {
                await SendVerificationEmail(appUser);

                var userVM = await GetUserViewModelHelper(appUser.Id);
                return CreatedAtAction(nameof(GetUserById), new { id = userVM?.Id }, userVM);
            }

            AddModelError(result.Errors);

            return BadRequest(ModelState);
        }

        [HttpPost("users/me/sendconfirmemail")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> SendConfirmEmail()
        {
            var userId = GetCurrentUserId();
            var appUser = await _userAccountService.GetUserByIdAsync(userId)
                ?? throw new UserNotFoundException($"Error retrieving details for the current user with ID: {userId}");

            if (appUser.EmailConfirmed == true)
                return BadRequest("User email has already been confirmed.");

            var result = await SendVerificationEmail(appUser);
            if (!result.success)
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "A server error occured whilst sending confirmation email");

            return Ok();
        }

        [HttpPut("public/confirmemail")]
        [AllowAnonymous]
        [ProducesResponseType(202)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            var appUser = await _userAccountService.GetUserByIdAsync(userId);

            if (appUser == null)
                return NotFound(userId);

            var result = await _userAccountService.ConfirmEmailAsync(appUser, code);
            if (!result.Succeeded)
            {
                AddModelError($"Confirming email failed for user \"{appUser.UserName}\".");
                AddModelError(string.Join(", ", result.Errors), "Errors");

                return BadRequest(ModelState);
            }

            return Accepted();
        }

        [HttpPost("public/recoverpassword")]
        [AllowAnonymous]
        [ProducesResponseType(202)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> RecoverPassword([FromBody] UserPasswordRecoveryVM recoveryInfo)
        {
            ApplicationUser? appUser = null;

            if (recoveryInfo.UsernameOrEmail.Contains('@'))
                appUser = await _userAccountService.GetUserByEmailAsync(recoveryInfo.UsernameOrEmail);

            appUser ??= await _userAccountService.GetUserByUserNameAsync(recoveryInfo.UsernameOrEmail);

            if (appUser == null || !await _userAccountService.GetIsEmailConfirmedAsync(appUser))
                return Accepted(); // Don't reveal that the user does not exist or is not confirmed

            var code = await _userAccountService.GeneratePasswordResetTokenAsync(appUser);
            var baseUrl = Utilities.GetBaseUrl(Request);

            await _emailSender.SendPasswordResetEmailAsync(baseUrl, code, appUser.UserName!, appUser.Email!);

            return Accepted();
        }

        [HttpPost("public/resetpassword")]
        [AllowAnonymous]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ResetPassword([FromBody] UserPasswordResetVM resetInfo)
        {
            ApplicationUser? appUser = null;

            if (resetInfo.UsernameOrEmail.Contains('@'))
                appUser = await _userAccountService.GetUserByEmailAsync(resetInfo.UsernameOrEmail);

            appUser ??= await _userAccountService.GetUserByUserNameAsync(resetInfo.UsernameOrEmail);

            if (appUser == null)
                return NoContent(); // Don't reveal that the user does not exist

            var result = await _userAccountService.ResetPasswordAsync(appUser, resetInfo.ResetCode, resetInfo.Password);
            if (!result.Succeeded)
            {
                AddModelError($"Resetting password failed for user \"{appUser.UserName}\".");
                AddModelError(string.Join(", ", result.Errors), "Errors");

                return BadRequest(ModelState);
            }

            return NoContent();
        }

        [HttpDelete("users/{id}")]
        [ProducesResponseType(200, Type = typeof(UserVM))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, id,
                UserAccountManagementOperations.DeleteOperationRequirement)).Succeeded)
                return new ChallengeResult();

            var appUser = await _userAccountService.GetUserByIdAsync(id);

            if (appUser == null)
                return NotFound(id);

            var canDelete = await _userAccountService.TestCanDeleteUserAsync(id);
            if (!canDelete.Success)
            {
                AddModelError($"User \"{appUser.UserName}\" cannot be deleted at this time. " +
                    "Delete the associated records and try again.");
                AddModelError(canDelete.Errors, "Records");
            }

            if (ModelState.IsValid)
            {
                var userVM = await GetUserViewModelHelper(appUser.Id);
                var result = await _userAccountService.DeleteUserAsync(appUser);

                if (!result.Succeeded)
                {
                    throw new UserAccountException($"The following errors occurred whilst deleting user \"{id}\": " +
                        $"{string.Join(", ", result.Errors)}");
                }

                return Ok(userVM);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("users/unblock/{id}")]
        [Authorize(AuthPolicies.ManageAllUsersPolicy)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UnblockUser(string id)
        {
            var appUser = await _userAccountService.GetUserByIdAsync(id);

            if (appUser == null)
                return NotFound(id);

            appUser.LockoutEnd = null;
            var result = await _userAccountService.UpdateUserAsync(appUser);

            if (!result.Succeeded)
            {
                throw new UserAccountException($"The following errors occurred whilst unblocking user: " +
                    $"{string.Join(", ", result.Errors)}");
            }

            return NoContent();
        }

        [HttpGet("users/me/preferences")]
        [ProducesResponseType(200, Type = typeof(string))]
        public async Task<IActionResult> UserPreferences()
        {
            var userId = GetCurrentUserId();

            var appUser = await _userAccountService.GetUserByIdAsync(userId);
            if (appUser != null)
                return Ok(appUser.Configuration);

            return NotFound(userId);
        }

        [HttpPut("users/me/preferences")]
        [ProducesResponseType(204)]
        public async Task<IActionResult> UserPreferences([FromBody] string? data)
        {
            var userId = GetCurrentUserId();
            var appUser = await _userAccountService.GetUserByIdAsync(userId);

            if (appUser != null)
            {
                appUser.Configuration = data;
                var result = await _userAccountService.UpdateUserAsync(appUser);

                if (!result.Succeeded)
                {
                    throw new UserAccountException(
                        $"The following errors occurred whilst updating User Configurations: " +
                        $"{string.Join(", ", result.Errors)}");
                }

                return NoContent();
            }

            return NotFound(userId);
        }

        private async Task<UserVM?> GetUserViewModelHelper(string userId)
        {
            var userAndRoles = await _userAccountService.GetUserAndRolesAsync(userId);
            if (userAndRoles == null)
                return null;

            var userVM = _mapper.Map<UserVM>(userAndRoles.Value.User);
            userVM.Roles = userAndRoles.Value.Roles;

            return userVM;
        }

        private async Task<(bool success, string? errorMsg)> SendVerificationEmail(ApplicationUser appUser)
        {
            var code = await _userAccountService.GenerateEmailConfirmationTokenAsync(appUser);
            var baseUrl = Utilities.GetBaseUrl(Request);

            return await _emailSender.SendEmailConfirmationEmailAsync(baseUrl, code,
                 appUser.Id, appUser.UserName!, appUser.Email!);
        }
    }
}
