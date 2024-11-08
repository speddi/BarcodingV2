using System.ComponentModel.DataAnnotations;

namespace Barcoding.Server.ViewModels.Maintenance
{
    public class AgeModifierViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Description is required"), StringLength(25, MinimumLength = 2, ErrorMessage = "Description must be between 2 and 200 characters")]
        public string Description { get; set; }

        public bool Enabled { get; set; }
    }
}
