using Barcoding.Core.Models.Account;

namespace Barcoding.Core.Services.Account.Interfaces
{
    public interface IUserAccountService
    {
        Task<bool> CheckPasswordAsync(ApplicationUser user, string password);
        Task<(bool Succeeded, string[] Errors)> CreateUserAsync(ApplicationUser user, IEnumerable<string> roles, string password);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(ApplicationUser user);
        Task<(bool Succeeded, string[] Errors)> DeleteUserAsync(string userId);
        Task<(ApplicationUser User, string[] Roles)?> GetUserAndRolesAsync(string userId);
        Task<ApplicationUser?> GetUserByEmailAsync(string email);
        Task<ApplicationUser?> GetUserByIdAsync(string userId);
        Task<ApplicationUser?> GetUserByUserNameAsync(string userName);
        Task<IList<string>> GetUserRolesAsync(ApplicationUser user);
        Task<List<(ApplicationUser User, string[] Roles)>> GetUsersAndRolesAsync(int page, int pageSize);
        Task<bool> GetUserHasPasswordAsync(ApplicationUser user);
        Task<(bool Succeeded, string[] Errors)> ResetPasswordAsync(ApplicationUser user, string newPassword);
        Task<(bool Succeeded, string[] Errors)> ResetPasswordAsync(ApplicationUser user, string token, string newPassword);
        Task<(bool Success, string[] Errors)> TestCanDeleteUserAsync(string userId);
        Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(ApplicationUser user, string currentPassword, string newPassword);
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(ApplicationUser user);
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(ApplicationUser user, IEnumerable<string>? roles);
        Task<string> GeneratePasswordResetTokenAsync(ApplicationUser user);
        Task<string> GenerateEmailConfirmationTokenAsync(ApplicationUser user);
        Task<(bool Succeeded, string[] Errors)> ConfirmEmailAsync(ApplicationUser user, string token);
        Task<bool> GetIsEmailConfirmedAsync(ApplicationUser user);
    }
}
