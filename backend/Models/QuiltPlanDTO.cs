namespace backend.Models;
public class QuitPlanDto
{
    public int PlanId { get; set; }
    public int? UserId { get; set; }
    public int? CoachId { get; set; }
    public int? StatusId { get; set; }
    public string Reason { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? GoalDate { get; set; }
}
