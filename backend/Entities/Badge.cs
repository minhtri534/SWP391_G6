using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("badge")]
    public class Badge
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BadgeId { get; set; }

        public string? BadgeName { get; set; }
        public string? Description { get; set; }
        public string? Condition_Type { get; set; }
        public int Value { get; set; }
    }
}