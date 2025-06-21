using InteligyBackend.Entities;
using Microsoft.EntityFrameworkCore;

namespace InteligyBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("users").HasKey(u => u.UserId);
            modelBuilder.Entity<Post>().ToTable("post").HasKey(p => p.PostId);
            modelBuilder.Entity<Comment>().ToTable("comment").HasKey(c => c.CommentId);
            modelBuilder.Entity<Role>().ToTable("role").HasKey(r => r.RoleId);
            modelBuilder.Entity<User>().HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId);
        }
    }
}
