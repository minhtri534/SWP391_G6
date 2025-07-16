using backend.Data;
using backend.Entities; // namespace chứa các model C#
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
    public DbSet<Membership> Memberships { get; set; }
    public DbSet<UserMembership> UserMemberships { get; set; }
    public DbSet<PaymentMemberShip> PaymentMemberships { get; set; }
    public DbSet<CoachInfo> CoachInfos { get; set; }
    public DbSet<PlanMilestone> PlanMilestones { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<SmokingStatus> SmokingStatuses { get; set; }
    public DbSet<CoachInfo> CoacheInfos { get; set; }
    public DbSet<BookingConsultation> BookingConsultations { get; set; }
    public DbSet<QuitPlan> QuitPlans { get; set; }
    public DbSet<DailyProgress> DailyProgresses { get; set; }
    public DbSet<Chat> ChatLog { get; set; }
    public DbSet<Badge> Badges { get; set; }
    public DbSet<UserBadge> UserBadges { get; set; }
    public DbSet<CoachPlanBadge> CoachPlanBadges { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<User>().ToTable("users").HasKey(u => u.UserId);
      modelBuilder.Entity<Post>().ToTable("post").HasKey(p => p.PostId);
      modelBuilder.Entity<Comment>().ToTable("comment").HasKey(c => c.CommentId);
      modelBuilder.Entity<Role>().ToTable("role").HasKey(r => r.RoleId);
      modelBuilder.Entity<User>().HasOne(u => u.Role).WithMany(r => r.Users).HasForeignKey(u => u.RoleId);
      modelBuilder.Entity<Report>().ToTable("report").HasKey(r => r.ReportId);
      modelBuilder.Entity<Notification>().ToTable("notification").HasKey(n => n.NotificationId);
      modelBuilder.Entity<DailyProgress>().ToTable("daily_progress").HasKey(dp => dp.ProgressId);
      modelBuilder.Entity<Feedback>().ToTable("feedback").HasKey(f => f.FeedbackId);
      modelBuilder.Entity<CoachInfo>().ToTable("coach_info").HasKey(c => c.CoachId);
      modelBuilder.Entity<QuitPlan>().ToTable("quit_plan").HasKey(q => q.PlanId);
    }
  }



}
