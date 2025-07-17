using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class BookingPaymentRequest
    {
        public int UserId { get; set; }
        public int PackageBookingId { get; set; }
        public required IFormFile Image { get; set; }
    }
}