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
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetPendingBooking(int userId)
        {
            var result = await _context.UserCoachPackages
                .Where(a => a.UserId == userId && a.Status.Equals("Pending"))
                .FirstOrDefaultAsync();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> BookCoach([FromBody] BookingRequest request)
        {
            var check = await _context.UserCoachPackages
                .Where(a => a.UserId == request.UserId && a.PackageBookingId == request.PackageBookingId && a.Status.Equals("Pending"))
                .FirstOrDefaultAsync();

            if (check != null)
            {
                return BadRequest();
            }

            UserCoachPackage booking;
            try
            {
                booking = new UserCoachPackage
                {
                    UserId = request.UserId,
                    PackageBookingId = request.PackageBookingId,
                    Status = "Pending"
                };
            }
            catch
            {
                return BadRequest();
            }
            await _context.UserCoachPackages.AddAsync(booking);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> CancelBooking(int userId)
        {
            var result = await _context.UserCoachPackages
                .Where(a => a.UserId == userId && a.Status.Equals("Pending"))
                .FirstOrDefaultAsync();
            if (result == null)
            {
                return BadRequest();
            }
            _context.UserCoachPackages.Remove(result);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
