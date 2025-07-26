using backend.Services;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserRankingController : ControllerBase
    {
        private readonly IUserRankingService _rankingService;

        public UserRankingController(IUserRankingService rankingService)
        {
            _rankingService = rankingService;
        }

        [Authorize(Roles = "3,4")]
        [HttpGet("top/{count}")]
        public async Task<IActionResult> GetTopUsers(int count)
        {
            var result = await _rankingService.GetTopUsersAsync(count);

            if (result == null || result.Count == 0)
            {
                return NotFound("Không tìm thấy dữ liệu xếp hạng.");
            }

            return Ok(result);
        }
    }
}
