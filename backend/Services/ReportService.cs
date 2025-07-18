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

        public async Task<ServiceAccessResult> CreateReportAsync(CreateReportDto dto)
        {
            if ((dto.PostId == null && dto.CommentId == null) || (dto.PostId != null && dto.CommentId != null))
            {
                return ServiceAccessResult.Forbid("Report must be either for a post or a comment, not both.");
            }

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

        public async Task<ServiceAccessResult> DeletePostAsync(int postId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
                return ServiceAccessResult.NotFound("Post not found");

            await _repository.DeletePostAsync(postId);
            return ServiceAccessResult.Ok();
        }


        public async Task<ServiceAccessResult> DeleteCommentAsync(int commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment == null)
                return ServiceAccessResult.NotFound("Comment not found");

            await _repository.DeleteCommentAsync(commentId);
            return ServiceAccessResult.Ok();
        }

        public async Task<ServiceAccessResult> DeleteReportAsync(int ReportId)
        {
            var report = await _repository.GetReportByIdAsync(ReportId);
            if (report == null)
                return ServiceAccessResult.NotFound("Report not found in report");

            await _repository.DeleteReportAsync(ReportId);
            return ServiceAccessResult.Ok();
        }        
    }
}
