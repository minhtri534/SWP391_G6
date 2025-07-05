using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Entities;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<UserMembership> UserMemberships { get; set; }
        public DbSet<PaymentMemberShip> PaymentMemberships { get; set; }
        public DbSet<CoachInfo> CoachInfos { get; set; }    
        public DbSet<PlanMilestone> PlanMilestones { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<SmokingStatus> SmokingStatuses { get; set; }

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
