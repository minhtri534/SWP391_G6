using backend.Entities;


namespace backend.Models
{
    public class RegistrationRequest
    {
        public string UserName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public int Age { get; set; }

        public string PhoneNum { get; set; } = string.Empty;
    }
}
