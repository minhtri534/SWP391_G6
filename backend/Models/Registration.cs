using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("users")] // nếu bảng trong SQL là users
    public class Registration
    {
        [Key]
        
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // để SQL tự sinh số
        public int userId { get; set; }

        public string userName { get; set; }     
        public int age { get; set; }     
        public string gender { get; set; }  
        public string phoneNum { get; set; }
        public string password { get; set; }
        public string status { get; set; }    
        public int roleId { get; set; }   
        public DateTime joinDate { get; set; }


    }
}
