using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _service;

        public PostController(IPostService service)
        {
            _service = service;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _service.GetAllPostsAsync();
            if (posts == null)
            {
                return NotFound("Post not found");                          
            }
            return Ok(posts);
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var post = await _service.GetPostByIdAsync(id);
            if (post == null) return NotFound();
            return Ok(post);
        }

        [Authorize(Roles = "2,3,4")] 
        [HttpPost]
        public async Task<IActionResult> Create(CreatePostDto dto)
        {
            var result = await _service.CanUserPostAsync(dto.UserId);
            if (!result.Allowed) return result.ErrorResult;

            var post = await _service.CreatePostAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = post.PostId }, post);
        }

        [Authorize(Roles = "2,3,4")] 
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdatePostDto dto)
        {
            var result = await _service.CanUserModifyPostAsync(id);
            if (!result.Allowed) return result.ErrorResult;

            await _service.UpdatePostAsync(id, dto);
            return NoContent();
        }

        [Authorize(Roles = "2,3,4")] 
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.CanUserModifyPostAsync(id);
            if (!result.Allowed) return result.ErrorResult;

            await _service.DeletePostAsync(id);
            return NoContent();
        }
    }
}
