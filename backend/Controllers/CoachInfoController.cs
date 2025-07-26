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
    public class CoachInfoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoachInfoController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCoachInfoByUserId(int userId)
        {
            var username = _context.Users.Select(a => new { UserId = a.UserId, UserName = a.UserName });
            var result = await _context.CoachInfos
                .Where(a => a.UserId == userId)
                .Join(username, a => a.UserId, b => b.UserId,
                    (a, b) => new
                    {
                        CoachId = a.CoachId,
                        UserName = b.UserName,
                        PhoneNum = a.PhoneNum,
                        Experience = a.Experience,
                        AvailableTime = a.AvailableTime
                    })
                .FirstOrDefaultAsync();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpGet("Booked/{memberId}")]
        public async Task<IActionResult> GetBookedCoachByMemberId(int memberId)
        {
            var package = await _context.UserCoachPackages
                .Where(a => a.UserId == memberId && a.Status.Equals("Active"))
                .FirstOrDefaultAsync();

            if (package == null)
            {
                return NotFound();
            }

            var coachPackage = await _context.CoachPackages
                .Where(a => a.PackageId == package.PackageId)
                .FirstAsync();

            var username = _context.Users.Select(a => new { UserId = a.UserId, UserName = a.UserName });
            var result = await _context.CoachInfos
                .Where(a => a.CoachId == coachPackage.CoachId)
                .Join(username, a => a.UserId, b => b.UserId,
                    (a, b) => new
                    {
                        CoachId = a.CoachId,
                        UserName = b.UserName,
                        PhoneNum = a.PhoneNum,
                        Experience = a.Experience,
                        AvailableTime = a.AvailableTime
                    })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}