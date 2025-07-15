using backend.Entities;
namespace backend.Models
{
    public class SmokingStatusRequest

    {
        public string TimePeriod { get; set; }
        public int AmountPerDay { get; set; }
        public string Frequency { get; set; }
        public decimal PricePerPack { get; set; }
        public string Description { get; set; }

    }
}
