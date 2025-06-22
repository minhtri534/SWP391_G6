namespace backend.Models
{
    public class CreatePostDto
    {
        public int UserId { get; set; }
        public required string Content { get; set; } = string.Empty;
    }
}

