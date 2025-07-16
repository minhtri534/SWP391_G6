using backend.Data;
using backend.Models;
using backend.Entity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] NotificationCreateRequest request)
        {
            try
            {
                var notification = new Notification
                {
                    UserId = request.UserId,
                    RelatedLogId = request.RelatedLogId,
                    RelatedMilestoneId = request.RelatedMilestoneId,
                    Message = request.Message,
                    Send_Date = request.Send_Date,
                    Type = request.Type
                };

                await _context.Notifications.AddAsync(notification);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSentNotifications(int id)
        {
            var results = _context.Notifications
                .Join(_context.PlanMilestones.Select(a => new { MilestoneId = a.MilestoneId, PlanId = a.PlanId }),
                b => b.RelatedMilestoneId,
                c => c.MilestoneId,
                (b, c) => new { UserId = b.UserId, Message = b.Message, PlanId = c.PlanId, Send_Date = b.Send_Date})
                .Join(_context.QuitPlans.Select(a => new { CoachId = a.CoachId, PlanId = a.PlanId }),
                b => b.PlanId,
                c => c.PlanId,
                (b, c) => new { UserId = b.UserId, Message = b.Message, CoachId = c.CoachId, Send_Date = b.Send_Date })
                .Join(_context.Users.Select(a => new { UserId = a.UserId, Username = a.UserName }),
                b => b.UserId,
                c => c.UserId,
                (b, c) => new { Username = c.Username, Message = b.Message, CoachId = b.CoachId, Send_Date = b.Send_Date })
                .Where(a => a.CoachId == id)
                .Select(a => new { Username = a.Username, Message = a.Message, Send_Date = a.Send_Date });

            return Ok(results);
        }

    }
}