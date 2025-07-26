using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class QuitPlanController : ControllerBase
{
    private readonly AppDbContext _context;
    public QuitPlanController(AppDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<QuitPlanDto>>> GetQuitPlansByUser(int userId)
    {
        var plans = await _context.QuitPlans
            .Where(q => q.UserId == userId)
            .Select(q => new QuitPlanDto
            {
                PlanId = q.PlanId,
                UserId = q.UserId,
                CoachId = q.CoachId,
                StatusId = q.StatusId,
                Reason = q.Reason,
                StartDate = q.Start_Date,
                GoalDate = q.Goal_Date
            })
            .ToListAsync();

        if (plans == null || plans.Count == 0)
        {
            return NotFound("No quit plans found for userId = {userId}");
        }

        return Ok(plans);
    }
    [Authorize(Roles = "3,4")]
    [HttpPost("create")]
    public async Task<IActionResult> CreateQuitPlan([FromBody] CreateQuitPlanRequest request)
    {
        
        if (request.UserId <= 0 || request.CoachId <= 0)
        {
            return BadRequest("Invalid UserId or CoachId .");
        }
        if (request.StartDate > request.GoalDate)
        {
            return BadRequest("StartDate must not be greater than GoalDate.");
        }

        

        var quitPlan = new QuitPlan
        {
            UserId = request.UserId,
            CoachId = request.CoachId,
            StatusId = request.StatusId,
            Reason = request.Reason,
            Start_Date = request.StartDate,
            Goal_Date = request.GoalDate,
        };

        _context.QuitPlans.Add(quitPlan);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetQuitPlanById), new { planId = quitPlan.PlanId }, quitPlan);
    }
    [Authorize]
    [HttpGet("{planId}")]
    public async Task<IActionResult> GetQuitPlanById(int planId)
    {
        var plan = await _context.QuitPlans.FindAsync(planId);
        if (plan == null)
            return NotFound();

        return Ok(plan);
    }
}

