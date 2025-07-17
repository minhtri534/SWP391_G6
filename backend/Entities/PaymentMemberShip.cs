using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    [Table("payment")]
    public class PaymentMemberShip
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentId { get; set; }

        public int UserId_fk { get; set; }

        public int MembershipId_fk { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime PayDate { get; set; }

        [MaxLength(50)]
        public string Method { get; set; }

        [MaxLength(50)]
        public string Type { get; set; }

        [MaxLength(50)]
        public string Status { get; set; }

        [ForeignKey(nameof(UserId_fk) + "," + nameof(MembershipId_fk))]
        public UserMembership UserMembership { get; set; }
    }
}