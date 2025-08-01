namespace backend.Models
{
    public class CreatePostDto
    {
        public required string Title { get; set; } = string.Empty;
        public required string Content { get; set; } = string.Empty;
    }
}

