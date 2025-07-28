using backend.Entities;
using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IReportService
    {
        Task<ServiceAccessResult> CreateReportAsync(CreateReportDto dto);
        Task<ServiceAccessResult> DeletePostAsync(int postId);
        Task<ServiceAccessResult> DeleteCommentAsync(int commentId);  
        Task<ServiceAccessResult> DeleteReportAsync(int ReportId);          
        Task<IEnumerable<ReportDto>> GetAllReportsAsync();
        Task<ReportDto?> GetReportByIdAsync(int id);
    }
}
