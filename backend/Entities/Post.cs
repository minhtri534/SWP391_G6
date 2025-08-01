using backend.Models;

namespace backend.Entities
{
    public class Post
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime Create_Date { get; set; }
        public bool IsApproved { get; set; } = false; 
        public User? User { get; set; }
        public required ICollection<Comment> Comments { get; set; }
    }

}
