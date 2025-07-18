using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("badge")]
    public class Badge
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("badgeId")]
        public int BadgeId { get; set; }
        [Column("badgeName")]
        [MaxLength(100)]

        public string? BadgeName { get; set; }
        [Column("description")]
        public string? Description { get; set; }
        [Column("condition_type")]
        public string? Condition_Type { get; set; }
        [Column("value")]
        public int Value { get; set; }
    }
}