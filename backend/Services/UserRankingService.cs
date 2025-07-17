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
                                where progress.No_Smoking == true
                                join user in _context.Users on progress.UserId equals user.UserId
                                group progress by new { user.UserId, user.UserName } into grouped
                                orderby grouped.Count() descending
                                select new UserRankingDto
                                {
                                    UserId = grouped.Key.UserId,
                                    UserName = grouped.Key.UserName,
                                    NoSmokingDays = grouped.Count()
                                }).Take(top).ToListAsync();

            return result;
        }
    }
}
