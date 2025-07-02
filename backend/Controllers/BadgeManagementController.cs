using backend.Data;
using backend.Models;
using FsCheck.Experimental;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            try
            {
                var NewBadge = new Badge
                {
                    BadgeName = badge.BadgeName,
                    Description = badge.Description,
                    Condition_Type = badge.Condition_Type,
                    Value = badge.Value
                };
                _context.Badges.Add(NewBadge);
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest();
            }
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
            return Ok(await _context.CoachPlanBadges.CountAsync());
        }

        [HttpGet("Stats/{id}")]
        public async Task<IActionResult> GetTotalNumberOfObtainedBadgesById(int id)
        {
            return Ok(await _context.CoachPlanBadges.Where(b => b.BadgeId == id).CountAsync());
        }

        [HttpGet("Stats/Ranking")]
        public async Task<IActionResult> GetTopTotalNumberOfObtainedBadges()
        {
            
            /*var sql = @$"select top 10 b.badgeName, count(a.badgeId) 
                from coach_plan_badge a 
                left outer join badge b on a.badgeId = b.badgeId 
                group by b.badgeName 
                order by count(b.badgeName) desc";

            return Ok(_context.CoachPlanBadges.FromSqlRaw(sql).ToListAsync()); */
            

            /*var query = (from a in _context.CoachPlanBadges
                         join b in _context.Badges on a.BadgeId equals b.BadgeId into joined
                         from c in joined
                         group c by c.BadgeName into grouped
                         from d in grouped
                         orderby grouped descending
                         select new { BadgeName = d.BadgeName, Count = d.BadgeName.Count() });
            return Ok(query);*/

            var query = _context.CoachPlanBadges
                .Join(_context.Badges.Select(a => new {BadgeId = a.BadgeId, BadgeName = a.BadgeName}), 
                c => c.BadgeId, 
                d => d.BadgeId, 
                (c, d) => new {BadgeName = d}).Select(a => a.BadgeName)
                .GroupBy(a => a.BadgeName)
                .Select(b => new {BadgeName = b.Key, Count = b.Count()});

            return Ok(query);
        }

        [HttpDelete("Revoke/{planId}/{badgeId}")]
        public async Task<IActionResult> RevokeBadge(int planId, int badgeId) {
            var badge = await _context.CoachPlanBadges
                .Where(a => a.PlanId == planId && a.BadgeId == badgeId)
                .FirstOrDefaultAsync();
            if (badge == null) {
                return NotFound();
            }
            _context.CoachPlanBadges.Remove(badge);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}