using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;


namespace backend.Entities
{
    [Table("quit_plan")]
    public class QuitPlan
    {
        [Key]
        public int PlanId { get; set; }

        public int? UserId { get; set; }
        public int? CoachId { get; set; }
        public int StatusId { get; set; }

        public string? Reason { get; set; }
        public DateTime? Start_Date { get; set; }
        public DateTime? Goal_Date { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("CoachId")]
        public CoachInfo? Coach { get; set; }

        public ICollection<Feedback>? Feedbacks { get; set; }
    }
}
