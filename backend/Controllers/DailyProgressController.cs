using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DailyProgressController : ControllerBase
{
    private readonly AppDbContext _context;

    public DailyProgressController(AppDbContext context)
    {
        _context = context;
    }
    [Authorize(Roles = "3,4")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DailyProgress>>> GetAll()
    {
        return await _context.DailyProgresses.ToListAsync();
    }

    [Authorize(Roles = "2,3,4")]
    [HttpGet("{id}")]
    public async Task<ActionResult<DailyProgress>> GetById(int id)
    {
        var dailyProgress = await _context.DailyProgresses.FindAsync(id);

        if (dailyProgress == null)
        {
            return NotFound();
        }

        return dailyProgress;
    }
    [Authorize(Roles = "2")]
    [HttpPost]
   
    public async Task<ActionResult<DailyProgress>> Create(DailyProgressRequest request)
    {
        var dailyProgress = new DailyProgress
        {
            UserId = request.UserId,
            Note = request.Note,
            No_Smoking = request.No_Smoking,
            Symptoms = request.Symptoms,
            Date = request.Date
        };

        _context.DailyProgresses.Add(dailyProgress);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = dailyProgress.ProgressId }, dailyProgress);
    }
    [Authorize(Roles = "2")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, DailyProgressRequest request)
    {
        var dailyProgress = await _context.DailyProgresses.FindAsync(id);

        if (dailyProgress == null)
        {
            return NotFound();
        }

        dailyProgress.UserId = request.UserId;
        dailyProgress.Note = request.Note;
        dailyProgress.No_Smoking = request.No_Smoking;
        dailyProgress.Symptoms = request.Symptoms;
        dailyProgress.Date = request.Date;

        _context.Entry(dailyProgress).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }
    [Authorize(Roles = "2")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var dailyProgress = await _context.DailyProgresses.FindAsync(id);

        if (dailyProgress == null)
        {
            return NotFound();
        }

        _context.DailyProgresses.Remove(dailyProgress);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
