using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entity
{
    [Table("plan_milestone")]
    public class PlanMilestone
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MilestoneId { get; set; }

        public int PlanId { get; set; }
        public int BadgeId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime Target_Date { get; set; }
    }
}