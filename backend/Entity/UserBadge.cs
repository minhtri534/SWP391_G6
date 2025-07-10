using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Entity
{
    [Table("user_badge")]
    [PrimaryKey(nameof(UserId), nameof(BadgeId))]
    public class UserBadge
    {
        [Key]
        [ForeignKey("UserId")]
        public int UserId { get; set; }
        [Key]
        [ForeignKey("BadgeId")]
        public int BadgeId { get; set; }
        public DateTime? Date_Awarded { get; set; }
    }
}