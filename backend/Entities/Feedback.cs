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
        public Registration? User { get; set; }

        // Ta sẽ tạo entity Coach sau
        public CoachInfo? Coach { get; set; }

        // Ta sẽ tạo entity QuitPlan sau
        public QuitPlan? Plan { get; set; }
    }
}
