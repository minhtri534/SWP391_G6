namespace backend.Models
{
    public class FeedbackDto
    {
        public int FeedbackId { get; set; }
        public int UserId { get; set; }
        public int? CoachId { get; set; }
        public int? PlanId { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime TimeCreated { get; set; }
    }
}
