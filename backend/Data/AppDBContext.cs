using backend.Models; // namespace chứa các model C#
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {
        }

        
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<CoachInfo> CoachInfos { get; set; }
        public DbSet<Post> Posts { get; set; }
  
    }
}
