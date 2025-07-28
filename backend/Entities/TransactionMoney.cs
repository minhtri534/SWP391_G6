using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    public class TransactionMoney
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("transactionId")]
        public int TransactionId { get; set; }
        [Column("memberId")]
        public int? MemberId { get; set; }
        [Column("coachId")]
        public int? CoachId { get; set; }
        [Column("planId")]
        public int? PlanId { get; set; }
        [Column("bookingId")]
        public int? BookingId { get; set; }
        [Column("amount", TypeName = "decimal(10,2)")]
        public decimal? Amount { get; set; }
        [Column("status")]
        public string? Status { get; set; }
        [Column("method")]
        public string? Method { get; set; }
        [Column("transactionDate")]
        public DateTime? TransactionDate { get; set; }

    }
}
