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

            modelBuilder.Entity<UserMembership>()
                .HasKey(um => new { um.UserId, um.MembershipId });
        }

    }
}
