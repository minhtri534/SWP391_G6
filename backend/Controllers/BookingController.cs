using backend.Data;
using backend.Models;
using backend.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FsCheck;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            var results = await _context.CoacheInfos
                .Join(username, a => a.UserId, b => b.UserId,
                    (a, b) => new {b.UserName, a.PhoneNum, a.Experience, a.Available_Time})
                .ToListAsync();
            return Ok(results);
        }

        [HttpGet("Coaches/{coachId}")]
        
        public async Task<IActionResult> GetCoachById(int coachId)
        {
            var username = _context.Users.Select(a => new { UserId = a.UserId, UserName = a.UserName });
            var results = await _context.CoacheInfos
                .Where(a => a.CoachId == coachId)
                .Join(username, a => a.UserId, b => b.UserId,
                    (a, b) => new {b.UserName, a.PhoneNum, a.Experience, a.Available_Time})
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
            var booking = new BookingConsultation
            {
                UserId = request.UserId,
                CoachId = request.CoachId,
                Date = request.Date,
                Type = request.Type,
                Status = "Pending"
            };
            await _context.BookingConsultations.AddAsync(booking);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
