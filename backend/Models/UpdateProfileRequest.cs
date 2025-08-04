using System.ComponentModel.DataAnnotations;

namespace backend.Models
{

  
    public class UpdateProfileRequest
    {
        public int Age { get; set; }


        [RegularExpression("^(Male|Female|Other)$", ErrorMessage = "Gender must be 'Male' or 'Female' or 'Other'.")]
        public string Gender { get; set; }
        public string UserName { get; set; }

    }
}
