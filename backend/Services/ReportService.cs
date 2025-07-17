using backend.Entities;
using backend.Models;
using backend.Repositories;
using backend.Data;


namespace backend.Services
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _repository;
        private readonly AppDbContext _context;

        public ReportService(IReportRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<ServiceAccessResult> CreateReportAsync(CreateReportDto dto, int userId)
        {
            if ((dto.PostId == null && dto.CommentId == null) || (dto.PostId != null && dto.CommentId != null))
            {
                return ServiceAccessResult.Forbid("Report must be either for a post or a comment, not both.");
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return ServiceAccessResult.NotFound("User not found");

            if (user.RoleId != 2 && user.RoleId != 3)
                return ServiceAccessResult.Forbid("Only admin can perform this action.");


            var report = new Report
            {
                Content = dto.Content,
                PostId = dto.PostId,
                CommentId = dto.CommentId,
                UserId = dto.UserId,
                CreateDay = DateTime.Today
            };

            await _repository.AddReportAsync(report);
            return ServiceAccessResult.Ok();
        }


        public async Task<IEnumerable<ReportDto>> GetAllReportsAsync()
        {
            var reports = await _repository.GetAllReportsAsync();
            return reports.Select(r => new ReportDto
            {
                ReportId = r.ReportId,
                Content = r.Content,
                PostId = r.PostId,
                CommentId = r.CommentId,
                UserId = r.UserId ?? 0,
                CreateDay = r.CreateDay
            });
        }

        public async Task<ReportDto?> GetReportByIdAsync(int id)
        {
            var r = await _repository.GetReportByIdAsync(id);
            if (r == null) return null;

            return new ReportDto
            {
                ReportId = r.ReportId,
                Content = r.Content,
                PostId = r.PostId,
                CommentId = r.CommentId,
                UserId = r.UserId ?? 0,
                CreateDay = r.CreateDay
            };
        }

        public async Task<ServiceAccessResult> DeletePostAsync(int postId, int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return ServiceAccessResult.NotFound("User not found");

            if (user.RoleId != 4)
                return ServiceAccessResult.Forbid("Only admin can perform this action.");


            var report = await _repository.GetReportByIdAsync(postId);
            if (report?.Post == null)
                return ServiceAccessResult.NotFound("Post not found in report");

            await _repository.DeletePostAsync(postId);
            return ServiceAccessResult.Ok();
        }

        public async Task<ServiceAccessResult> DeleteCommentAsync(int commentId, int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return ServiceAccessResult.NotFound("User not found");

            if (user.RoleId != 4)
                return ServiceAccessResult.Forbid("Only admin can perform this action.");


            var report = await _repository.GetReportByIdAsync(commentId);
            if (report?.Comment == null)
                return ServiceAccessResult.NotFound("Comment not found in report");

            await _repository.DeleteCommentAsync(commentId);
            return ServiceAccessResult.Ok();
        }
        public async Task<ServiceAccessResult> DeleteReportAsync(int ReportId, int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return ServiceAccessResult.NotFound("User not found");

            if (user.RoleId != 4)
                return ServiceAccessResult.Forbid("Only admin can perform this action.");


            var report = await _repository.GetReportByIdAsync(ReportId);
            if (report == null)
                return ServiceAccessResult.NotFound("Report not found in report");

            await _repository.DeleteReportAsync(ReportId);
            return ServiceAccessResult.Ok();
        }        
    }
}
