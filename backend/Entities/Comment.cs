
using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("commentId")]
        public int CommentId { get; set; }
        [Column("postId")]
        public int? PostId { get; set; }
        [Column("userId")]
        public int? UserId { get; set; }
        [Column("content")]
        public String? Content { get; set; }
        [Column("created_date")]
        public DateTime? Created_Date { get; set; }
        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }    
        [ForeignKey(nameof(PostId))]

        public required Post Post { get; set; }
    }
}
