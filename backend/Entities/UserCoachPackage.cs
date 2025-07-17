using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("user_coach_package")]
    public class UserCoachPackage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PackageBookingId { get; set; }
        [ForeignKey("userId")]
        public int UserId { get; set; }
        [ForeignKey("packageId")]
        public int PackageId { get; set; }
        public DateTime? Start_Date { get; set; }
        public DateTime? End_Date { get; set; }
        public required string Status { get; set; }
    }
}