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

        // 🟢 API: Lấy tất cả báo cáo vi phạm
        [HttpGet]
        public async Task<IActionResult> GetAllReports()
        {
            var reports = await _reportService.GetAllReportsAsync();
            return Ok(reports);
        }

        // 🟡 API: Xem chi tiết 1 báo cáo theo reportId
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReportById(int id)
        {
            var report = await _reportService.GetReportByIdAsync(id);
            if (report == null)
                return NotFound("Report not found");

            return Ok(report);
        }

        // 🔴 API: Admin xóa bài viết vi phạm
        [HttpDelete("post/{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            var result = await _reportService.DeletePostAsync(postId);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Post deleted successfully");
        }

        // 🔴 API: Admin xóa bình luận vi phạm
        [HttpDelete("comment/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var result = await _reportService.DeleteCommentAsync(commentId);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Comment deleted successfully");
        }

        // 🟢 API: Thành viên/HLV gửi báo cáo vi phạm
        [HttpPost]
        public async Task<IActionResult> CreateReport([FromBody] CreateReportDto dto)
        {
            var result = await _reportService.CreateReportAsync(dto);
            if (!result.Allowed)
                return result.ErrorResult;

            return Ok("Report submitted successfully");
        }
    }
}
