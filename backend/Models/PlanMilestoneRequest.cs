namespace backend.Models
{
    public class PlanMilestoneRequest
    {
        public int MilestoneId { get; set; }
        public int PlanId { get; set; }
        public int BadgeId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime TargetDate { get; set; }
    }
}
