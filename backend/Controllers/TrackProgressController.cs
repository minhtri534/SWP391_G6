using backend.Data;
using backend.Models;
using backend.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackProgressController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TrackProgressController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMemberDailyProgress([FromQuery] int? userId, [FromQuery] DateTime? date = null)
        {
            if (userId == null) {
                return BadRequest();
            }
            if (date == null)
            {
                var result = _context.DailyProgresses
                    .Where(a => a.UserId == userId)
                    .Select(a => new { Note = a.Note, No_Smoking = a.No_Smoking, Symptoms = a.Symptoms, Date = a.Date })
                    .OrderByDescending(a => a.Date);
                if (result.IsNullOrEmpty())
                {
                    return NotFound();
                }
                return Ok(result);
            }
            else
            {
                var result = _context.DailyProgresses
                .Where(a => a.UserId == userId && date.Value.Date.CompareTo(a.Date.Date) == 0)
                .Select(a => new { Note = a.Note, No_Smoking = a.No_Smoking, Symptoms = a.Symptoms, Date = a.Date });
                if (result.IsNullOrEmpty())
                {
                    return NotFound();
                }
                return Ok(result);
            }

        }
    }
}