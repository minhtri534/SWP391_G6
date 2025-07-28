using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

       
        [RegularExpression("^(Male|Female|Other)$", ErrorMessage = "Gender must be 'Male' or 'Female' or 'Other'.")]
        public string Gender { get; set; }
        public int Age { get; set; }
        public int Experience { get; set; }
        public string AvailableTime { get; set; }
        public string Specialty { get; set; }

    }
}
