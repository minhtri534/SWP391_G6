using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("quit_plan")]
    public class QuitPlan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PlanId { get; set; }

        public int? UserId { get; set; }
        public int? CoachId { get; set; }
        public int? StatusId { get; set; }
        public string? Reason { get; set; }
        public DateTime? Start_Date { get; set; }
        public DateTime? Goal_Date { get; set; }
    }
}