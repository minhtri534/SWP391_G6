using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace backend.Entities
{

    [Table("membership")]
    public class Membership
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int membershipId { get; set; } 

        [MaxLength(100)]
        public string membershipName { get; set; } 

        [Column(TypeName = "decimal(10, 2)")]

        public decimal price { get; set; } 

        public int duration { get; set; }
    }
}
