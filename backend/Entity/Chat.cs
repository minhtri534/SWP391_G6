using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entity
{
    [Table("chat_log")]
    public class Chat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChatId { get; set; }
        public int UserId { get; set; }
        public int CoachId { get; set; }
        public string? Content { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
        public DateTime Chat_Date { get; set; }
        public string? Sender { get; set; }
    }
}