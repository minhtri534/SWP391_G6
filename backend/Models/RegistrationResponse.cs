namespace backend.Models
{
    public class RegistrationResponse
    {
        public int UserId { get; set; }

        public string UserName { get; set; } = string.Empty;

        public DateTime JoinDate { get; set; }

        public int RoleId { get; set; }
    }
}
