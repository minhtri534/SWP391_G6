using backend.Models;

namespace backend.Entities
{
    public class Notification
    {
        public int NotificationId { get; set; }
        public int UserId { get; set; }
        public required string Message { get; set; }
        public DateTime Send_date { get; set; }
        public required string Type { get; set; }
        public required Registration User { get; set; }
    }
}
