namespace backend.Models
{
    
        public class LoginResponse
        {
            public string Message { get; set; } = string.Empty;
            public int UserId { get; set; }
            public int RoleId { get; set; }
            public string UserName { get; set; } = string.Empty;
        }
    

}
