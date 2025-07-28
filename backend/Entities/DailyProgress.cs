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
        [Column("no_smoking")]
        public bool No_Smoking { get; set; }
        [Column("symptoms")]
        public string? Symptoms { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("userId")]
        public int? UserId { get; set; }
        
        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }
    }
}
