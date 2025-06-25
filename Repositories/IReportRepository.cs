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
        Task DeletePostAsync(int postId);
        Task DeleteCommentAsync(int commentId);
        Task AddReportAsync(Report report);
        Task DeleteReportAsync(int ReportId);


    }
}
