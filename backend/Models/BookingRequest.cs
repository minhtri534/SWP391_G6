using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class BookingRequest
    {
        public int UserId { get; set; }
        public int CoachId { get; set; }
        public DateTime Date { get; set; }
        public string? Type { get; set; }
    }
}