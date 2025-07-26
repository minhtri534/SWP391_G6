
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Entities
{
    [Table("membership")]
    public class Membership
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("membershipId")]
        public int MembershipId { get; set; }

        
        [MaxLength(100)]
        [Column("membershipName")]
        public string? MembershipName { get; set; }

        [Column("price",TypeName = "decimal(10,2)")]
        public decimal? Price { get; set; }
        [Column("duration")]

        public int Duration { get; set; }

        
    }
}
