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
        [Column("feedbackId")]
        public int FeedbackId { get; set; }
        [Column("userId")]

        public int? UserId { get; set; }
        [Column("coachId")]
        public int? CoachId { get; set; }
        [Column("planId")]
        public int? PlanId { get; set; }
        [Column("content")]

        public required string? Content { get; set; }
        [Column("rating")]
        public int? Rating { get; set; }
        [Column("time_created")]

        public DateTime? Time_Created { get; set; }

        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
        [ForeignKey(nameof(CoachId))]

        public CoachInfo? Coach { get; set; }
        [ForeignKey(nameof(PlanId))]

        public QuitPlan? Plan { get; set; }
    }
}
