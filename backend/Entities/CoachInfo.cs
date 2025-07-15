using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    [Table("coach_info")]
    public class CoachInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CoachId { get; set; }
        public int UserId { get; set; }
        [MaxLength(20)]
        public string PhoneNum { get; set; }
        public int Experience { get; set; }
        [MaxLength(100)]
        public string AvailableTime { get; set; }
        [MaxLength(100)]

        public string Speciality { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
