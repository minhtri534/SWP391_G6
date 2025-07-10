using backend.Data;
using backend.Models;
using backend.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FsCheck;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BadgeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BadgeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetBadgesByUser(int userId)
        {
            var result = _context.UserBadges
                .Where(a => a.UserId == userId)
                .Join(_context.Badges,
                    b => b.BadgeId,
                    c => c.BadgeId,
                    (b, c) => new { BadgeName = c.BadgeName, Description = c.Description, Date_Awarded = b.Date_Awarded });
            if (result.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("{userId}/{badgeId}")]
        public async Task<IActionResult> GetBadgeById(int badgeId, int userId)
        {
            var result = _context.UserBadges
                .Where(a => a.UserId == userId && a.BadgeId == badgeId)
                .Join(_context.Badges,
                    b => b.BadgeId,
                    c => c.BadgeId,
                    (b, c) => new { BadgeName = c.BadgeName, Description = c.Description, Date_Awarded = b.Date_Awarded });
            if (result.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> EarnBadge([FromBody] UserBadge badge)
        {
            try
            {
                await _context.UserBadges.AddAsync(badge);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest();
            }
            return Ok();
            
        }
    }
}