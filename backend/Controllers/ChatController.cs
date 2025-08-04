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
    [Authorize(Roles = "2,3")]
    public class ChatController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChatController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ChatSendRequest chat)
        {
            var vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            var message = new Chat();
            try
            {
                message = new Chat
                {
                    UserId = chat.UserId,
                    CoachId = chat.CoachId,
                    Content = chat.Content,
                    Type = chat.Type,
                    Status = chat.Status,   
                    Chat_Date = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vietnamTimeZone),
                    Sender = chat.Sender
                };


            }
            catch
            {
                return BadRequest();
            }
            await _context.ChatLog.AddAsync(message);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> LoadChat([FromQuery] ChatLoadRequest request)
        {
            try
            {
                var results = await _context.ChatLog
                    .Where(a => a.UserId == request.UserId && a.CoachId == request.CoachId)
                    //.OrderByDescending(a => a.Chat_Date)
                    .ToListAsync();

                if (results.IsNullOrEmpty())
                {
                    return NotFound();
                }
                return Ok(results);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}