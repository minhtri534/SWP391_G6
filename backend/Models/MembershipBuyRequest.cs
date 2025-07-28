using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class MembershipBuyRequest
    {
        public int UserId { get; set; }
        public int MembershipId { get; set; }
        public DateTime Start_Date { get; set; }
    }
}