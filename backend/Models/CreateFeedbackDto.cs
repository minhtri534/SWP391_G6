namespace backend.Models
{
    public class CreateFeedbackDto
    {
        public int UserId { get; set; }
        public int? CoachId { get; set; }
        public int? PlanId { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Rating { get; set; }
    }
}
