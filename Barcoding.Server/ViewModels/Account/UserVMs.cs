using Barcoding.Core.Extensions;
using Barcoding.Server.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Barcoding.Server.ViewModels.Account
{
    public class UserVM : UserBaseVM
    {
        public bool IsLockedOut { get; set; }
        public bool EmailConfirmed { get; set; }

        [MinimumCount(1, ErrorMessage = "Roles cannot be empty")]
        public string[]? Roles { get; set; }
    }

    public class UserEditVM : UserBaseVM
    {
        public string? CurrentPassword { get; set; }

        [MinLength(6, ErrorMessage = "New Password must be at least 6 characters")]
        public string? NewPassword { get; set; }

        [MinimumCount(1, false, ErrorMessage = "Roles cannot be empty")]
        public string[]? Roles { get; set; }
    }

    public class UserPublicRegisterVM : UserBaseVM
    {
        public UserPublicRegisterVM()
        {
            IsEnabled = true;
        }

        [Required(ErrorMessage = "New Password is required"),
         MinLength(6, ErrorMessage = "New Password must be at least 6 characters")]
        public required string NewPassword { get; set; }
    }

    public class UserPasswordRecoveryVM
    {
        [Required(ErrorMessage = "Username or email address is required")]
        public required string UsernameOrEmail { get; set; }
    }

    public class UserPasswordResetVM
    {
        [Required(ErrorMessage = "Username or email address is required")]
        public required string UsernameOrEmail { get; set; }

        [Required(ErrorMessage = "Password is required"),
         MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public required string Password { get; set; }

        [Required(ErrorMessage = "Password reset code is required")]
        public required string ResetCode { get; set; }
    }

    public class UserPatchVM
    {
        public string? FullName { get; set; }

        public string? JobTitle { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Configuration { get; set; }
    }

    public abstract class UserBaseVM : ISanitizeModel
    {
        public virtual void SanitizeModel()
        {
            Id = Id.NullIfWhiteSpace();
            FullName = FullName.NullIfWhiteSpace();
            JobTitle = JobTitle.NullIfWhiteSpace();
            PhoneNumber = PhoneNumber.NullIfWhiteSpace();
            Configuration = Configuration.NullIfWhiteSpace();
        }

        public string? Id { get; set; }

        [Required(ErrorMessage = "Username is required"),
         StringLength(200, MinimumLength = 2, ErrorMessage = "Username must be between 2 and 200 characters")]
        public required string UserName { get; set; }

        public string? FullName { get; set; }

        [Required(ErrorMessage = "Email is required"),
         StringLength(200, ErrorMessage = "Email must be at most 200 characters"),
         EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }

        public string? JobTitle { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Configuration { get; set; }

        public bool IsEnabled { get; set; }
    }
}
