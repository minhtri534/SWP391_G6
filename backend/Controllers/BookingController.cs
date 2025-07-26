using backend.Data;
using backend.Models;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "2")]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("Coaches")]
        public async Task<IActionResult> GetListOfCoaches()
        {
            var username = _context.Users.Select(a => new { UserId = a.UserId, UserName = a.UserName });
            var results = await _context.CoachInfos
                .Join(username, a => a.UserId, b => b.UserId,
                    (a, b) => new
                    {
                        CoachId = a.CoachId,
                        UserName = b.UserName,
                        PhoneNum = a.PhoneNum,
                        Experience = a.Experience,
                        AvailableTime = a.AvailableTime
                    })
                .ToListAsync();
            return Ok(results);
        }

        [HttpGet("Package/{coachId}")]
        public async Task<IActionResult> GetPackagesById(int coachId)
        {
            var results = await _context.CoachPackages
                .Where(a => a.CoachId == coachId)
                .ToListAsync();
                
            if (results.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(results);
        }
        [HttpPost]
        public async Task<IActionResult> BookCoach([FromBody] BookingRequest request)
        {
            var check = await _context.UserCoachPackages
                .Where(a => a.UserId == request.UserId && a.Status.Equals("Active"))
                .FirstOrDefaultAsync();

            if (check != null)
            {
                return BadRequest("Has active coach or not found");
            }

            var role = await _context.Users
                .Where(a => a.UserId == request.UserId)
                .FirstOrDefaultAsync();


            if (role.RoleId != 2)
            {
                return BadRequest($"Only members can book coach");
            }

            var package = await _context.CoachPackages
                .FindAsync(request.PackageId);

            if (package == null) {
                return NotFound();
            }

            var end_date = request.Start_Date.AddMonths(package.Duration_Months);


            var booking = new UserCoachPackage
            {
                UserId = request.UserId,
                PackageId = request.PackageId,
                Start_Date = request.Start_Date,
                End_Date = end_date,
                Status = "Active"
            };


            await _context.UserCoachPackages.AddAsync(booking);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
