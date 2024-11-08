using Barcoding.Core.Extensions;
using Barcoding.Server.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Barcoding.Server.ViewModels.Account
{
    public class RoleVM : ISanitizeModel
    {
        public virtual void SanitizeModel()
        {
            Id = Id.NullIfWhiteSpace();
            Name = Name.NullIfWhiteSpace();
            Description = Description.NullIfWhiteSpace();
        }

        public string? Id { get; set; }

        [Required(ErrorMessage = "Role name is required"),
         StringLength(200, MinimumLength = 2, ErrorMessage = "Role name must be between 2 and 200 characters")]
        public string? Name { get; set; }

        public string? Description { get; set; }

        public int UsersCount { get; set; }

        public PermissionVM[]? Permissions { get; set; }
    }
}
