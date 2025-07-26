using backend.Data;
using backend.Models;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FsCheck;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            var result = await _context.UserBadges
                .Where(a => a.UserId == userId)
                .Join(_context.Badges,
                    b => b.BadgeId,
                    c => c.BadgeId,
                    (b, c) => new { BadgeId = c.BadgeId, BadgeName = c.BadgeName, Description = c.Description, Date_Awarded = b.Date_Awarded })
                    .ToListAsync();
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
        [HttpGet("Unearned/{userId}")]
        public async Task<IActionResult> GetUnearnedBadges(int userId)
        {
            var results = await _context.Badges
                .Where(a => !_context.UserBadges
                    .Where(a => a.UserId == userId)
                    .Select(a => a.BadgeId)
                    .Contains(a.BadgeId))
                .Select(a => new { BadgeName = a.BadgeName, Description = a.Description })
                .ToListAsync();
            if (results == null)
            {
                return NotFound();
            }
            return Ok(results);
        }

        [HttpPost]
        [Authorize(Roles = "3,4")]
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
            SendBadgeNotification(badge);
            return Ok();
        }

        private async void SendBadgeNotification(UserBadge badge)
        {
            var username = _context.Users
                .Where(a => a.UserId == badge.UserId)
                .Select(a => a.UserName)
                .ToString();

            var badgeName = _context.Badges
                .Where(a => a.BadgeId == badge.BadgeId)
                .Select(a => a.BadgeName)
                .ToString();

            string message = $"Congratulations, {username}!\nYou just recieved the {badgeName} bagde!\nGood luck on your quitting journey!";
            var notification = new Notification
            {
                UserId = badge.UserId,
                Message = message,
                Type = "Milestone",
                Send_Date = badge.Date_Awarded
            };
            await _context.Notifications.AddAsync(notification);
        }
    }
}