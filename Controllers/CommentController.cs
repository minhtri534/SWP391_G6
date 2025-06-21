using InteligyBackend.Dtos;
using InteligyBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace InteligyBackend.Controllers
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
            var comments = await _service.GetAllAsync();
            return Ok(comments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var comment = await _service.GetByIdAsync(id);
            if (comment == null) return NotFound();
            return Ok(comment);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCommentDto dto)
        {
            var result = await _service.CanUserCommentAsync(dto.UserId);
            if (!result.Allowed) return result.ErrorResult;

            var comment = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = comment.CommentId }, comment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCommentDto dto)
        {
            var result = await _service.CanUserModifyCommentAsync(id);
            if (!result.Allowed) return result.ErrorResult;

            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.CanUserModifyCommentAsync(id);
            if (!result.Allowed) return result.ErrorResult;

            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
