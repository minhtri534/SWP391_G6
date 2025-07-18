using backend.Entities;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IReportService
    {
        Task<ServiceAccessResult> CreateReportAsync(CreateReportDto dto, int userId);
        Task<ServiceAccessResult> DeletePostAsync(int postId, int userId);
        Task<ServiceAccessResult> DeleteCommentAsync(int commentId, int userId);  
        Task<ServiceAccessResult> DeleteReportAsync(int ReportId, int userId);          
        Task<IEnumerable<ReportDto>> GetAllReportsAsync();
        Task<ReportDto?> GetReportByIdAsync(int id);
    }
}
