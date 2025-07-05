using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly AppDbContext _context;

        public ReportRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Report>> GetAllReportsAsync()
        {
            return await _context.Reports
                .Include(r => r.User)
                .Include(r => r.Post)
                .Include(r => r.Comment)
                .ToListAsync();
        }

        public async Task<Report?> GetReportByIdAsync(int id)
        {
            return await _context.Reports
                .Include(r => r.User)
                .Include(r => r.Post)
                .Include(r => r.Comment)
                .FirstOrDefaultAsync(r => r.ReportId == id);
        }

        public async Task DeletePostAsync(int postId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post != null)
            {
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteCommentAsync(int commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteReportAsync(int ReportId)
        {
            var report = await _context.Reports.FindAsync(ReportId);
            if (report != null)
            {
                _context.Reports.Remove(report);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddReportAsync(Report report)
        {
            await _context.Reports.AddAsync(report);
            await _context.SaveChangesAsync();
        }

    }
}
