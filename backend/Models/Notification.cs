using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("notification")]
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NotificationId { get; set; }

        public int? UserId { get; set; }
        public int? RelatedLogId { get; set; }
        public int? RelatedMilestoneId { get; set; }
        public string? Message { get; set; }
        public DateTime? Send_Date { get; set; }
        public string? Type { get; set; }
    }
}