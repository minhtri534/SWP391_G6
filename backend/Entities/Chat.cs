using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("chat_log")]
    public class Chat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("chatId")]
        public int ChatId { get; set; }
        [Column("userId")]
        public int UserId { get; set; }
        [Column("coachId")]
        public int CoachId { get; set; }
        [Column("content")]
        public string? Content { get; set; }
        [Column("type")]
        public string? Type { get; set; }
        [Column("status")]
        public string? Status { get; set; }
        [Column("chat_date")]
        public DateTime Chat_Date { get; set; }
        [Column("sender")]
        public string? Sender { get; set; }
    }
}