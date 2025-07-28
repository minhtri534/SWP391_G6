namespace backend.Models
{
    public class PostDto
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime Create_Date { get; set; }
    }
}

