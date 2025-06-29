using backend.Data;
using backend.Entities;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _repository;
        private readonly AppDbContext _context;

        public FeedbackService(IFeedbackRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<FeedbackDto>> GetAllFeedbacksAsync(int? userId = null, int? coachId = null, int? planId = null, int? requesterId = null)
        {
            if (requesterId.HasValue)
            {
                var requester = await _context.Users.FindAsync(requesterId.Value);
                if (requester == null)
                    return new List<FeedbackDto>();

                bool isAdmin = requester.roleId == 4;

                if (!isAdmin && !userId.HasValue && !coachId.HasValue && !planId.HasValue)
                {
                    return new List<FeedbackDto>();
                }
            }

            var feedbacks = await _repository.GetAllAsync();

            if (userId.HasValue)
                feedbacks = feedbacks.Where(f => f.UserId == userId.Value).ToList();
            if (coachId.HasValue)
                feedbacks = feedbacks.Where(f => f.CoachId == coachId.Value).ToList();
            if (planId.HasValue)
                feedbacks = feedbacks.Where(f => f.PlanId == planId.Value).ToList();

            return feedbacks.Select(f => new FeedbackDto
            {
                FeedbackId = f.FeedbackId,
                UserId = f.UserId,
                CoachId = f.CoachId,
                PlanId = f.PlanId,
                Content = f.Content,
                Rating = f.Rating,
                TimeCreated = f.Time_Created
            });
        }

        public async Task<FeedbackDto?> GetFeedbackByIdAsync(int id)
        {
            var f = await _repository.GetByIdAsync(id);
            if (f == null) return null;

            return new FeedbackDto
            {
                FeedbackId = f.FeedbackId,
                UserId = f.UserId,
                CoachId = f.CoachId,
                PlanId = f.PlanId,
                Content = f.Content,
                Rating = f.Rating,
                TimeCreated = f.Time_Created
            };
        }

        public async Task<ServiceAccessResult> CreateFeedbackAsync(CreateFeedbackDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null || user.roleId != 2)
                return ServiceAccessResult.Forbid("Only members can create feedback.");

            if (dto.CoachId == null && dto.PlanId == null)
            {
                return ServiceAccessResult.Forbid("Feedback must be associated with either a coach or a plan.");
            }

            var feedback = new Feedback
            {
                UserId = dto.UserId,
                CoachId = dto.CoachId,
                PlanId = dto.PlanId,
                Content = dto.Content,
                Rating = dto.Rating,
                Time_Created = DateTime.Today
            };

            await _repository.AddAsync(feedback);
            return ServiceAccessResult.Ok();
        }

        public async Task<ServiceAccessResult> UpdateFeedbackAsync(int id, UpdateFeedbackDto dto)
        {
            var feedback = await _repository.GetByIdAsync(id);
            if (feedback == null)
                return ServiceAccessResult.NotFound("Feedback not found");

            if (feedback.UserId != dto.UserId)
                return ServiceAccessResult.Forbid("You can only update your own feedback.");

            feedback.Content = dto.Content;
            feedback.Rating = dto.Rating;
            await _repository.UpdateAsync(feedback);

            return ServiceAccessResult.Ok();
        }

        public async Task<ServiceAccessResult> DeleteFeedbackAsync(int id, int userId)
        {
            var feedback = await _repository.GetByIdAsync(id);
            if (feedback == null)
                return ServiceAccessResult.NotFound("Feedback not found");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return ServiceAccessResult.Forbid("User not found");

            if (feedback.UserId != userId && user.roleId != 4)
                return ServiceAccessResult.Forbid("You can only delete your own feedback.");

            await _repository.DeleteAsync(feedback);
            return ServiceAccessResult.Ok();
        }

    }
}
