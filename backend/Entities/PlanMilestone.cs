using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    [Table ("plan_milestone")]
    public class PlanMilestone
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MilestoneId { get; set; }
        public int PlanId { get; set; }
        public int? BadgeId { get; set; }
        [MaxLength(100)]
        public string? Title { get; set; }
        [Column(TypeName = "text")]
        public string? Description { get; set; }
        [Column("target_date")]
        public DateTime TargetDate { get; set; }
        [ForeignKey(nameof(BadgeId))]
        public Badge? Badge { get; set; }
    }
}
