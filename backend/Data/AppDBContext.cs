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


    public DbSet<Registration> Users { get; set; }
    public DbSet<SmokingStatus> SmokingStatuses { get; set; }
    public DbSet<QuitPlan> QuitPlans { get; set; }
    public DbSet<PlanMilestone> PlanMilestones { get; set; }
    public DbSet<DailyProgress> DailyProgresses { get; set; }
    public DbSet<Chat> ChatLog { get; set; }
    public DbSet<Badge> Badges { get; set; }
    public DbSet<CoachPlanBadge> CoachPlanBadges { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<User> Users { get; set; }
    }
        
    }
}
