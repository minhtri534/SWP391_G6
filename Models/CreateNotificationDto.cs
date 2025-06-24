namespace backend.Models
{
    public class CreateNotificationDto
    {
        public int UserId { get; set; }
        public required string Message { get; set; }
        public required string Type { get; set; }
    }
}
