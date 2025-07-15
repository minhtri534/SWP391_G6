using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CreateCoachAccRequest
    {
        [Required(ErrorMessage = "Username must be filled.")]
        [MaxLength(20, ErrorMessage = "Your Username should be in range of 20")]
        public string Username { get; set; }

        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Phone number must start with 0 and contain exactly 10 digits.")]
        public string PhoneNum { get; set; }

        [Required(ErrorMessage = "You must enter password")]
        [MinLength(6)]
        public string Password { get; set; }

        [Required(ErrorMessage = "You must enter password")]
        [MinLength(6)]
        public string ConfirmPassword { get; set; }



    }
}
