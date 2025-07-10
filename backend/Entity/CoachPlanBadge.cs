using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace backend.Entity
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
        public DateTime? Date_Get { get; set; }
    }
}