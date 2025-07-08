using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("report")]
    public class Report
    {
        [Key]
        public int ReportId { get; set; }
        public required string Content { get; set; }
        public int? PostId { get; set; }
        public int? UserId { get; set; }
        public int? CommentId { get; set; }
        [Column("create_day")]
        public DateTime CreateDay { get; set; } = DateTime.Today;
        public Post? Post { get; set; }
        public Comment? Comment { get; set; }
        public User? User { get; set; }
    }
}
