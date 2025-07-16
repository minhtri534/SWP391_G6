
using System.ComponentModel.DataAnnotations;
namespace backend.Models
{
    public class SmokingStatusRequest

    {
        [Required (ErrorMessage = "You must fill this plank")]
        public string TimePeriod { get; set; }
        [Required (ErrorMessage = "You must fill this plank")]
        public int AmountPerDay { get; set; }
        [Required (ErrorMessage = "You must fill this plank")]
        public string Frequency { get; set; }
        [Required (ErrorMessage = "You must fill this plank")]
        public decimal PricePerPack { get; set; }
        public string Description { get; set; }

    }
}
