using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Entities;


namespace backend.Models
{
    [Table("users")] 
    public class Registration
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int userId { get; set; }

        public required string userName { get; set; }
        public int age { get; set; }
        public required string gender { get; set; }
        public required string phoneNum { get; set; }
        public required string password { get; set; }
        public required string status { get; set; }
        public int roleId { get; set; }
        public DateTime joinDate { get; set; }

        public required Role Role { get; set; }  
        public required ICollection<Post> Posts { get; set; }
        public required ICollection<Comment> Comments { get; set; }
        

    }
}
