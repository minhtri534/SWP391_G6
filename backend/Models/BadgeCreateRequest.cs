using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class BadgeCreateRequest
    {
        public string? BadgeName { get; set; }
        public string? Description { get; set; }
        public string? Condition_Type { get; set; }
        public int Value { get; set; }
    }
}