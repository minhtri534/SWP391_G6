namespace backend.Models
{
    public class UpdatePostDto
    {
        public required string Title { get; set; } = string.Empty;
        public required string Content { get; set; } = string.Empty;
    }
}

