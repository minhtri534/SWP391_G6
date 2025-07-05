using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UpdateProfileRequest
    {
        public int Age { get; set; }
        public string Gender { get; set; }

        [MaxLength(10)]
        [RegularExpression(@"^0\d{9}$", ErrorMessage = "Phone number must start with 0 and contain exactly 10 digits.")]
        public string PhoneNum { get; set; }
    }
}
