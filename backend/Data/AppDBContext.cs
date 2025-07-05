using backend.Models; 
using backend.Entities; 
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {
        }

        
        public DbSet<Registration> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Notification> Notifications  { get; set; }
        public DbSet<DailyProgress> DailyProgresses { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<CoachInfo> CoachInfos { get; set; }
        public DbSet<QuitPlan> QuitPlans { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Registration>().ToTable("users").HasKey(u => u.userId);
            modelBuilder.Entity<Post>().ToTable("post").HasKey(p => p.PostId);
            modelBuilder.Entity<Comment>().ToTable("comment").HasKey(c => c.CommentId);
            modelBuilder.Entity<Role>().ToTable("role").HasKey(r => r.RoleId);
            modelBuilder.Entity<Registration>().HasOne(u => u.Role).WithMany(r => r.Users).HasForeignKey(u => u.roleId);
            modelBuilder.Entity<Report>().ToTable("report").HasKey(r => r.ReportId);
            modelBuilder.Entity<Notification>().ToTable("notification").HasKey(n => n.NotificationId);
            modelBuilder.Entity<DailyProgress>().ToTable("daily_progress").HasKey(dp => dp.progressId);
            modelBuilder.Entity<Feedback>().ToTable("feedback").HasKey(f => f.FeedbackId);
            modelBuilder.Entity<CoachInfo>().ToTable("coach_info").HasKey(c => c.CoachId);
            modelBuilder.Entity<QuitPlan>().ToTable("quit_plan").HasKey(q => q.PlanId);
        }
    }
}
