
using backend.Models;

namespace backend.Entities
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public required string Content { get; set; }
        public DateTime Created_Date { get; set; }
        public required User User { get; set; }
        public required Post Post { get; set; }
    }
}
