using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SmokingStatusController : ControllerBase
    {
        private readonly AppDbContext _context;
        public SmokingStatusController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("{userId}")]
        [Authorize(Roles = "2,3")]
        public async Task<IActionResult> GetSmokingStatusByUserId(int userId)
        {
            var result = await _context.SmokingStatuses
                .Where(a => a.UserId == userId)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpPost]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> CreateSmokingStatus([FromBody] SmokingStatusRequest request)
        {
            var result = await _context.SmokingStatuses
                .Where(a => a.UserId == request.UserId)
                .FirstOrDefaultAsync();

            if (result != null)
            {
                return BadRequest();
            }

            var status = new SmokingStatus
            {
                UserId = request.UserId,
                TimePeriod = request.TimePeriod,
                AmountPerDay = request.AmountPerDay,
                Frequency = request.Frequency,
                PricePerPack = request.PricePerPack,
                Description = request.Description
            };

            await _context.SmokingStatuses.AddAsync(status);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPut]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> UpdateSmokingStatus([FromBody] SmokingStatusRequest request)
        {
            var result = await _context.SmokingStatuses
                .Where(a => a.UserId == request.UserId)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return BadRequest();
            }

            result.TimePeriod = request.TimePeriod;
            result.AmountPerDay = request.AmountPerDay;
            result.Frequency = request.Frequency;
            result.PricePerPack = request.PricePerPack;
            result.Description = request.Description;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
