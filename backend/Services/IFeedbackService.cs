using backend.Models;

namespace backend.Services
{
    public interface IFeedbackService
    {
        Task<IEnumerable<FeedbackDto>> GetAllFeedbacksAsync(int? userId = null, int? coachId = null, int? planId = null, int? requesterId = null);
        Task<FeedbackDto?> GetFeedbackByIdAsync(int id);
        Task<ServiceAccessResult> CreateFeedbackAsync(CreateFeedbackDto dto);
        Task<ServiceAccessResult> UpdateFeedbackAsync(int id, UpdateFeedbackDto dto);
        Task<ServiceAccessResult> DeleteFeedbackAsync(int id, int userId);
    }
}
