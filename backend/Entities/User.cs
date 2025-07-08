using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace backend.Entities
{
    [Table("users")] 
    public class User
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int UserId { get; set; }

        public required string UserName { get; set; }
        public int Age { get; set; }
        public required string Gender { get; set; }
        public required string PhoneNum { get; set; }
        public required string Password { get; set; }
        public required string Status { get; set; }
        public int RoleId { get; set; }
        public DateTime JoinDate { get; set; }

        public required Role Role { get; set; }  
        public required ICollection<Post> Posts { get; set; }
        public required ICollection<Comment> Comments { get; set; }
        

    }
}
