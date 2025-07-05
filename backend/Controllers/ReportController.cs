using backend.Entities;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReports()
        {
            var reports = await _reportService.GetAllReportsAsync();
            return Ok(reports);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReportById(int id)
        {
            var report = await _reportService.GetReportByIdAsync(id);
            if (report == null)
                return NotFound("Report not found");

            return Ok(report);
        }

        [HttpDelete("post/{postId}")]
        public async Task<IActionResult> DeletePost(int postId, [FromQuery] int userId)
        {
            var result = await _reportService.DeletePostAsync(postId, userId);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Post deleted successfully");
        }

        [HttpDelete("comment/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId, [FromQuery] int userId)
        {
            var result = await _reportService.DeleteCommentAsync(commentId, userId);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Comment deleted successfully");
        }

        [HttpPost]
        public async Task<IActionResult> CreateReport([FromBody] CreateReportDto dto, [FromQuery] int userId)
        {
            var result = await _reportService.CreateReportAsync(dto, userId);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Report submitted successfully");
        }
        
        [HttpDelete("report/{ReportId}")]
        public async Task<IActionResult> DeleteReport(int ReportId, [FromQuery] int userId)
        {
            var result = await _reportService.DeleteReportAsync(ReportId, userId);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Report deleted successfully");
        }

    }
}
