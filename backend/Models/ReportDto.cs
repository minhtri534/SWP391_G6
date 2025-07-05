namespace backend.Models
{
    public class ReportDto
    {
        public int ReportId { get; set; }
        public required string Content { get; set; }
        public int? PostId { get; set; }
        public int? CommentId { get; set; }
        public int UserId { get; set; }
        public DateTime CreateDay { get; set; }
    }
}
