using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("booking_consultation")]
    public class BookingConsultation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingId { get; set; }
        [ForeignKey("userId")]
        public int? UserId { get; set; }
        [ForeignKey("coachId")]
        public int? CoachId { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("type")]
        public string? Type { get; set; }
        [Column("status")]
        public string? Status { get; set; }
    }
}