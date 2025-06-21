namespace InteligyBackend.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public required string UserName { get; set; }
        public int Age { get; set; }
        public required string Gender { get; set; }
        public required string PhoneNum { get; set; }
        public required string Password { get; set; }
        public int RoleId { get; set; }
        public required string Status { get; set; }
        public DateTime JoinDate { get; set; }
        public required Role Role { get; set; }  // Navigation property
        public required ICollection<Post> Posts { get; set; }
        public required ICollection<Comment> Comments { get; set; }
    }
}
