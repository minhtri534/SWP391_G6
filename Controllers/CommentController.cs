using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _service;

        public CommentController(ICommentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _service.GetAllCommentAsync();
            return Ok(comments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var comment = await _service.GetCommentByIdAsync(id);
            if (comment == null) return NotFound();
            return Ok(comment);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCommentDto dto)
        {
            var result = await _service.CanUserCommentAsync(dto.UserId);
            if (!result.Allowed) return result.ErrorResult;

            var comment = await _service.CreateCommentAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = comment.CommentId }, comment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCommentDto dto)
        {
            var result = await _service.CanUserModifyCommentAsync(id);
            if (!result.Allowed) return result.ErrorResult;

            await _service.UpdateCommentAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.CanUserModifyCommentAsync(id);
            if (!result.Allowed) return result.ErrorResult;

            await _service.DeleteCommentAsync(id);
            return NoContent();
        }
    }
}
