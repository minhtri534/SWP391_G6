using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entity
{
    [Table("coach_info")]
    public class CoachInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CoachId { get; set; }
        [ForeignKey("userId")]
        public int UserId { get; set; }
        [ForeignKey("coachId")]
        public string? PhoneNum { get; set; }
        public int Experience { get; set; }
        public string? Available_Time { get; set; }
        public string? Specialty { get; set; }
    }
}