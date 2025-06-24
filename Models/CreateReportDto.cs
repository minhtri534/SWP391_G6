namespace backend.Models;

public class CreateReportDto
{
    public required string Content { get; set; }
    public int? PostId { get; set; }
    public int? CommentId { get; set; }
    public int UserId { get; set; }
}
