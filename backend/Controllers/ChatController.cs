using Azure.Core;
using backend.Data;
using backend.Models;
using FsCheck.Experimental;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            try
            {
                var message = new Chat
                {
                    UserId = chat.UserId,
                    CoachId = chat.CoachId,
                    Content = chat.Content,
                    Type = chat.Type,
                    Status = chat.Status,
                    Chat_Date = chat.Chat_Date,
                    Sender = chat.Sender
                };

                await _context.ChatLog.AddAsync(message);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> LoadChat([FromQuery] ChatLoadRequest request)
        {
            try
            {
                var results = await _context.ChatLog
                    .Where(a => a.UserId == request.UserId && a.CoachId == request.CoachId)
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