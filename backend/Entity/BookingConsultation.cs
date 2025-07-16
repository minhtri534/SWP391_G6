using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entity
{
    [Table("booking_consultation")]
    public class BookingConsultation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingId { get; set; }
        [ForeignKey("userId")]
        public int UserId { get; set; }
        [ForeignKey("coachId")]
        public int CoachId { get; set; }
        public DateTime Date { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
    }
}