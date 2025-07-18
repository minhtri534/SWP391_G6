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
            await _context.Database.ExecuteSqlRawAsync(@"
                DELETE FROM report 
                WHERE commentId IN (SELECT commentId FROM comment WHERE postId = {0})", postId);
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM comment WHERE postId = {0}", postId);
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM report WHERE postId = {0}", postId);
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM post WHERE postId = {0}", postId);
        }


        public async Task DeleteCommentAsync(int commentId)
        {
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM report WHERE commentId = {0}", commentId);
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM comment WHERE commentId = {0}", commentId);
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


        public async Task<Report?> GetReportByPostIdAsync(int postId)
        {
            return await _context.Reports
                .Include(r => r.User)
                .Include(r => r.Post)
                .Include(r => r.Comment)
                .FirstOrDefaultAsync(r => r.PostId == postId);
        }

        public async Task<Report?> GetReportByCommentIdAsync(int commentId)
        {
            return await _context.Reports
                .Include(r => r.User)
                .Include(r => r.Post)
                .Include(r => r.Comment)
                .FirstOrDefaultAsync(r => r.CommentId == commentId);
        }


        public async Task AddReportAsync(Report report)
        {
            await _context.Reports.AddAsync(report);
            await _context.SaveChangesAsync();
        }

    }
}
