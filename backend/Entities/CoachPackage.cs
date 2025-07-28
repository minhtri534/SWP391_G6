using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("coach_package")]
    public class CoachPackage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("packageId")]
        public int PackageId { get; set; }

        [Column("coachId")]
        public int CoachId { get; set; }

        [Column("packageName")]
        public string? PackageName { get; set; }

        [Column("duration_months")]
        public int Duration_Months { get; set; }

        [Column("price")]
        public decimal? Price { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [ForeignKey(nameof(CoachId))]
        public CoachInfo CoachInfo { get; set; } = null!;
    }
}