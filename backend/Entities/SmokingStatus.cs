using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    [Table ("smoking_status")]
    public class SmokingStatus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("statusId")]
        public int StatusId { get; set; }
        [Column("userId")]
        public int? UserId { get; set; }
        [Column("milestoneId")]
        public int? MilestoneId { get; set; }
        [MaxLength (50)]
        [Column("time_period")]
        
        public string? TimePeriod { get; set; }
        [Column("amount_per_day")]
        public int? AmountPerDay { get; set; }
        [MaxLength (50)]
        [Column("frequency")]
        public string? Frequency { get; set; }

        [Column("price_per_pack", TypeName = "decimal(10, 2)")]
        
        public decimal PricePerPack { get; set; }
        [Column("description")]
        public required string? Description { get; set; }
        [ForeignKey (nameof (UserId))]
        public User? User { get; set; }

        [ForeignKey(nameof (MilestoneId))]
        public PlanMilestone? PlanMilestone { get; set; }

    }
}
