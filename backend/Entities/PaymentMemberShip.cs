using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    [Table("payment")]
    public class PaymentMemberShip
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("paymentId")]
        public int PaymentId { get; set; }
        [Column("userId_fk")]
        public int? UserId_fk { get; set; }
        [Column("membershipId_fk")]
        public int? MembershipId_fk { get; set; }

        [Column("amount",TypeName = "decimal(10,2)")]
        public decimal? Amount { get; set; }
        [Column("payDate")]
        public DateTime? PayDate { get; set; }
        [Column("method")]
        public string? Method { get; set; }
        [Column("type")]
        public string? Type { get; set; }
        [Column("status")]
        public string? Status { get; set; }

        [ForeignKey(nameof(UserId_fk) + "," + nameof(MembershipId_fk))]
        public required UserMembership UserMembership { get; set; }
    }
}