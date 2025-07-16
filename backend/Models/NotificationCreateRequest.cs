using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class NotificationCreateRequest
    {
        public int UserId { get; set; }
        public int RelatedLogId { get; set; }
        public int RelatedMilestoneId { get; set; }
        public string? Message { get; set; }
        public DateTime Send_Date { get; set; }
        public string? Type { get; set; }
    }
}