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
        [Column("progressId")]
        public int ProgressId { get; set; }
        public string? Note { get; set; }
        public bool No_Smoking { get; set; }
        public string? Symptoms { get; set; }
        public DateTime Date { get; set; }
        public int? UserId { get; set; }
        
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
    }
}
