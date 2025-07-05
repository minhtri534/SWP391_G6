using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

namespace backend.Entities
{
    [Table("daily_progress")]
    public class DailyProgress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int progressId { get; set; }
        public int milestoneId { get; set; }
        public string? note { get; set; }
        public bool no_smoking { get; set; }
        public string? symptoms { get; set; }
        public DateTime date { get; set; }
        public int userId { get; set; }
        
        [ForeignKey("userId")]
        public Registration? User { get; set; }
    }
}
