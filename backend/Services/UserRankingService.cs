using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class UserRankingService : IUserRankingService
    {
        private readonly AppDbContext _context;

        public UserRankingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserRankingDto>> GetTopUsersAsync(int top)
        {
            var result = await (from progress in _context.DailyProgresses
                                where progress.no_smoking == true
                                join user in _context.Users on progress.userId equals user.userId
                                group progress by new { user.userId, user.userName } into grouped
                                orderby grouped.Count() descending
                                select new UserRankingDto
                                {
                                    UserId = grouped.Key.userId,
                                    UserName = grouped.Key.userName,
                                    NoSmokingDays = grouped.Count()
                                }).Take(top).ToListAsync();

            return result;
        }
    }
}
