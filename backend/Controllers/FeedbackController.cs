using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _service;

        public FeedbackController(IFeedbackService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetFeedbacks([FromQuery] int? userId, [FromQuery] int? coachId)
        {
            var result = await _service.GetAllFeedbacksAsync(userId, coachId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetFeedbackByIdAsync(id);
            if (result == null)
                return NotFound("Feedback not found");

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFeedbackDto dto)
        {
            var result = await _service.CreateFeedbackAsync(dto);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Feedback submitted successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateFeedbackDto dto)
        {
            var result = await _service.UpdateFeedbackAsync(id, dto);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Feedback updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, [FromQuery] int userId)
        {
            var result = await _service.DeleteFeedbackAsync(id, userId);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Feedback deleted successfully");
        }
    }
}
