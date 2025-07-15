using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    [Table("role")]
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        [MaxLength(100)]
        public string RoleName { get; set; }
    }
}
