 using backend.Data;
using backend.Models;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "4")]
    public class BadgeManagementController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BadgeManagementController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBadges()
        {
            return Ok(_context.Badges.ToList());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBadgeById(int id)
        {
            var badge = await _context.Badges.FindAsync(id);
            if (badge == null)
            {
                return NotFound();
            }
            return Ok(badge);
        }

        [HttpPost]
        public async Task<IActionResult> AddBadge([FromBody] BadgeCreateRequest badge)
        {
            Badge NewBadge;
            try
            {
                NewBadge = new Badge
                {
                    BadgeName = badge.BadgeName,
                    Description = badge.Description,
                    Condition_Type = badge.Condition_Type,
                    Value = badge.Value
                };
            }
            catch
            {
                return BadRequest();
            }
            _context.Badges.Add(NewBadge);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBadgeById(int id)
        {
            var badge = await _context.Badges.FindAsync(id);
            if (badge == null)
            {
                return NotFound();
            }
            _context.Badges.Remove(badge);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("Stats")]
        public async Task<IActionResult> GetTotalNumberOfObtainedBadges()
        {
            return Ok(await _context.UserBadges.CountAsync());
        }

        [HttpGet("Stats/{id}")]
        public async Task<IActionResult> GetTotalNumberOfObtainedBadgesById(int id)
        {
            return Ok(await _context.UserBadges.Where(b => b.BadgeId == id).CountAsync());
        }

        [HttpGet("Stats/Ranking")]
        public async Task<IActionResult> GetTopTotalNumberOfObtainedBadges()
        {
            var query = _context.UserBadges
                .Join(_context.Badges.Select(a => new { BadgeId = a.BadgeId, BadgeName = a.BadgeName }),
                c => c.BadgeId,
                d => d.BadgeId,
                (c, d) => new { BadgeName = d })
                .GroupBy(a => a.BadgeName)
                .Select(b => new { BadgeId = b.Key.BadgeId, BadgeName = b.Key.BadgeName, Count = b.Count() });

            return Ok(query);
        }

        [HttpDelete("Revoke/{userId}/{badgeId}")]
        public async Task<IActionResult> RevokeBadge(int userId, int badgeId)
        {
            var badge = await _context.UserBadges
                .Where(a => a.UserId == userId && a.BadgeId == badgeId)
                .FirstOrDefaultAsync();
            if (badge == null)
            {
                return NotFound();
            }
            _context.UserBadges.Remove(badge);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}