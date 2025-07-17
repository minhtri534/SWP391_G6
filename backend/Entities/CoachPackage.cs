using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("coach_package")]
    public class CoachPackage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PackageId { get; set; }
        [ForeignKey("coachId")]
        public int CoachId { get; set; }
        public string? PackageName { get; set; }
        public int Duration_Months { get; set; }
        public float Price { get; set; }
        public string? Description { get; set; }
    }
}