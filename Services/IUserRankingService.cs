using backend.Models;

namespace backend.Services
{
    public interface IUserRankingService
    {
        Task<List<UserRankingDto>> GetTopUsersAsync(int top);
    }
}