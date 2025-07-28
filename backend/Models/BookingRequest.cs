using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class BookingRequest
    {
        public int UserId { get; set; }
        public int PackageId { get; set; }
        public DateTime Start_Date { get; set; }
    }
}