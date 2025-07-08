namespace backend.Models
{
    public class CreateCommentDto
    {
        public int UserId { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; } = string.Empty;
    }

    public class UpdateCommentDto
    {
        public string Content { get; set; } = string.Empty;
    }
    public class CommentDto
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public required string Content { get; set; }
        public DateTime Created_Date { get; set; }
    }

}