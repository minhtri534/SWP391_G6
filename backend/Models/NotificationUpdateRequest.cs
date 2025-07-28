using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class NotificationUpdateRequest
    {
        public int NotificationId { get; set; }
        public string? Message { get; set; }
    }
}