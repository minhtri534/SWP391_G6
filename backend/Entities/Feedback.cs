using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

namespace backend.Entities
{
    [Table("feedback")]
    public class Feedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeedbackId { get; set; }

        public int UserId { get; set; }
        public int? CoachId { get; set; }
        public int? PlanId { get; set; }

        public required string Content { get; set; }
        public int Rating { get; set; }

        public DateTime Time_Created { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public CoachInfo? Coach { get; set; }

        public QuitPlan? Plan { get; set; }
    }
}
