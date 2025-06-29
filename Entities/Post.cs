using backend.Models;

namespace backend.Entities
{
    public class Post
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public required string Title { get; set; }        
        public required string Content { get; set; }
        public DateTime Create_date { get; set; }
        public required Registration User { get; set; }
        public required ICollection<Comment> Comments { get; set; }
    }
}
