using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "2,3,4")]    
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _service;

        public FeedbackController(IFeedbackService service)
        {
            _service = service;
        }

        [Authorize(Roles = "2,3,4")]
        [HttpGet]
        public async Task<IActionResult> GetFeedbacks([FromQuery] int? userId)
        {
            var result = await _service.GetAllFeedbacksAsync(userId);
            return Ok(result);
        }

        [Authorize(Roles = "2,3,4")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetFeedbackByIdAsync(id);
            if (result == null)
                return NotFound("Feedback not found");

            return Ok(result);
        }

        [Authorize(Roles = "2")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFeedbackDto dto)
        {
            var result = await _service.CreateFeedbackAsync(dto);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Feedback submitted successfully");
        }

        [Authorize(Roles = "2")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateFeedbackDto dto)
        {
            var result = await _service.UpdateFeedbackAsync(id, dto);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Feedback updated successfully");
        }


        [Authorize(Roles = "2")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteFeedbackAsync(id);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Feedback deleted successfully");
        }
    }
}
