using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entity
{
    [Table("daily_progress")]
    public class DailyProgress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProgressId { get; set; }

        public int UserId { get; set; }
        public string? Note { get; set; }
        public bool No_Smoking { get; set; }
        public string? Symptoms { get; set; }
        public DateTime Date { get; set; }
    }
}