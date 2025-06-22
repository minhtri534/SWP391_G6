
using backend.Models;

namespace backend.Entities
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public required string Content { get; set; }
        public DateTime Created_date { get; set; }
        public required Registration User { get; set; }
        public required Post Post { get; set; }
    }
}
