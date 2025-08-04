 using backend.Data;
using backend.Models;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoachController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("Member/{coachId}")]
        public async Task<IActionResult> GetBookedCoachByMemberId(int coachId)
        {
            var packages = _context.CoachPackages
                .Where(a => a.CoachId == coachId);

            if (packages == null)
            {
                return NotFound();
            }

            var results = await _context.UserCoachPackages
                .Join(packages.Select(a => new { PackageId = a.PackageId }),
                a => a.PackageId,
                b => b.PackageId,
                (a, b) => new { UserId = a.UserId })
                .Join(_context.Users,
                a => a.UserId,
                b => b.UserId,
                (a,b) => b)
                .ToListAsync();

            if (results.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(results);
        }
        [HttpGet("CoachInfoByUser/{userId}")]
        public async Task<IActionResult> GetCoachInfoByUserId(int userId)
        {
           
            var coachInfo = await _context.UserCoachPackages
                .Where(ucp => ucp.UserId == userId)
                .Join(_context.CoachInfos,
                      ucp => ucp.PackageId,
                      ci => ci.CoachId,   
                      (ucp, ci) => ci)
                .Select(ci => new
                {
                    ci.CoachId,
                    UserName = ci.User.UserName, 
                    ci.PhoneNum,
                    ci.Experience,
                    ci.Specialty,
                    ci.AvailableTime
                })
                .FirstOrDefaultAsync();

            if (coachInfo == null)
                return NotFound();

            return Ok(coachInfo);
        }

    }
}