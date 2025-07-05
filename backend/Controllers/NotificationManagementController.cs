using backend.Data;
using backend.Models;
using backend.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationManagementController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NotificationManagementController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNotifications()
        {
            return Ok(await _context.Notifications.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound();
            }
            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNotification([FromBody] NotificationUpdateRequest request)
        {
            var notification = await _context.Notifications
                .Where(a => a.NotificationId == request.NotificationId)
                .FirstOrDefaultAsync();
            if (notification == null)
            {
                return BadRequest();
            }
            notification.Message = request.Message;
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}