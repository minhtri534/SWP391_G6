using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    [Table("coach_plan_badge")]
    [PrimaryKey(nameof(BadgeId), nameof(PlanId))]
    public class CoachPlanBadge
    {
        [ForeignKey("CoachId")]
        public int CoachId { get; set; }
        [Key]
        [ForeignKey("BadgeId")]
        public int BadgeId { get; set; }
        [Key]
        [ForeignKey("PlanId")]
        public int PlanId { get; set; }
        //[NotMapped]
        public Nullable<DateTime> Date_Get { get; set; }
    }
}