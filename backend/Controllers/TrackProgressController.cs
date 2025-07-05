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

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetMemberDailyProgress(int userId)
        {
            var result = _context.DailyProgresses
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.Date);
            if (result.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}