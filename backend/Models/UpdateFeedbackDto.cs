namespace backend.Models
{
    public class UpdateFeedbackDto
    {
        public int UserId { get; set; }        
        public required string Content { get; set; } = string.Empty;
        public int Rating { get; set; }
    }
}

