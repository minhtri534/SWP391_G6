// Repositories/IReportRepository.cs
using backend.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public interface IReportRepository
    {
        Task<IEnumerable<Report>> GetAllReportsAsync();
        Task<Report?> GetReportByIdAsync(int id);

        // ✅ Thêm mới
        Task<Report?> GetReportByPostIdAsync(int postId);
        Task<Report?> GetReportByCommentIdAsync(int commentId);

        Task DeletePostAsync(int postId);
        Task DeleteCommentAsync(int commentId);
        Task DeleteReportAsync(int ReportId);
        Task AddReportAsync(Report report);
    }

}
