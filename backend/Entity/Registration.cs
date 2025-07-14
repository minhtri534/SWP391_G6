using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entity
{
    [Table("users")] // nếu bảng trong SQL là users
    public class Registration
    {
        [Key]
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // để SQL tự sinh số
        public int UserId { get; set; }

        public string? UserName { get; set; }     
        public int Age { get; set; }     
        public string? Gender { get; set; }  
        public string? PhoneNum { get; set; }
        public string? Password { get; set; }
        public string? Status { get; set; }    
        public int RoleId { get; set; }   
        public DateTime JoinDate { get; set; }


    }
}
