using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UpdateProfileRequest
    {
        public int Age { get; set; }
        public string Gender { get; set; }

        
    }
}
