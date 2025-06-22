using backend.Models;

namespace backend.Entities
{
    public class Role
    {
        public int RoleId { get; set; }
        public required string RoleName { get; set; }
        public required ICollection<Registration> Users { get; set; }
    }
}

