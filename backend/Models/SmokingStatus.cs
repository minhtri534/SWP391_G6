using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("smoking_status")]
    public class SmokingStatus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StatusId { get; set; }

        public int? UserId { get; set; }
        public string? Time_Period { get; set; }
        public int MilestoneId { get; set; }
        public int Amount_Per_Day { get; set; }
        public string? Frequency { get; set; }
        public float Price_Per_Pack { get; set; }
        public string? Description { get; set; }
    }
}