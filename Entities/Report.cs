using backend.Models;

namespace backend.Entities
{
    public class Report
    {
        public int ReportId { get; set; }
        public required string Content { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public int CommentId { get; set; }
        public DateTime Create_date { get; set; }
        public required Comment Comment { get; set; }
        public required Registration User { get; set; }
        public required Post Post { get; set; }
    }
}
