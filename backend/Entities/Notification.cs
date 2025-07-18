using backend.Models;

namespace backend.Entities
{
    public class Notification
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public int? RelatedLogId { get; set; }
        public int? RelatedMilestoneId { get; set; }
        public required string Message { get; set; }
        public DateTime Send_Date { get; set; }
        public required string Type { get; set; }
    }
}
