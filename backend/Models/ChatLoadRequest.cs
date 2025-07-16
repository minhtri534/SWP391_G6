using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ChatLoadRequest
    {
        public int UserId { get; set; }
        public int CoachId { get; set; }
    }
}