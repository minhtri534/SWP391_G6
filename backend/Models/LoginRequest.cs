using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class LoginRequest
    {
        [Required (ErrorMessage ="You must enter your Username")]
        public string Username { get; set; }

        [Required (ErrorMessage = "You must enter your password")]
        public string Password { get; set; }
    }
}
