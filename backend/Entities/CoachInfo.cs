using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;


namespace backend.Entities
{
    [Table("coach_info")]
    public class CoachInfo
    {
        [Key]
        public int CoachId { get; set; }

        public int UserId { get; set; }

        public string? PhoneNum { get; set; }
        public int Experience { get; set; }
        public string? Available_time { get; set; }
        public string? Specialty { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public ICollection<Feedback>? Feedbacks { get; set; }
    }
}
