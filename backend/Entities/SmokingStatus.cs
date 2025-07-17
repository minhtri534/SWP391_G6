using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    [Table ("smoking_status")]
    public class SmokingStatus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StatusId { get; set; }
        public int UserId { get; set; }
        public int MilestoneId { get; set; }
        [MaxLength (50)]
        
        public string TimePeriod { get; set; }
        public int AmountPerDay { get; set; }
        [MaxLength (50)]
        public string Frequency { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        
        public Decimal PricePerPack { get; set; }
        [Column(TypeName = "text")]
        public string Description { get; set; }
        [ForeignKey (nameof (UserId))]
        public User User { get; set; }

        [ForeignKey(nameof (MilestoneId))]
        public PlanMilestone PlanMilestone { get; set; }

    }
}
