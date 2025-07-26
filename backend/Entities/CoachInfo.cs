using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    [Table("coach_info")]
    public class CoachInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("coachId")]
        public int CoachId { get; set; }
        [Column("userId")]
        public int? UserId { get; set; }
        [MaxLength(20)]
        [Column("phoneNum")]
        public string? PhoneNum { get; set; }
        [Column("experience")]
        public int? Experience { get; set; }
        [MaxLength(100)]
        [Column("available_time")]
        public string? AvailableTime { get; set; }
        [MaxLength(100)]
        [Column("specialty")]
        public string? Specialty { get; set; }
        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }
    }
}
