using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;
        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Comment>> GetAllAsync()
        {
            return await _context.Comments.ToListAsync();
        }

       public async Task<Comment> GetByIdAsync(int id)
        {
        #pragma warning disable CS8603 // Possible null reference return.
            return await _context.Comments.FindAsync(id);
        #pragma warning restore CS8603 // Possible null reference return.
        }

        public async Task AddAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Comment comment)
        {
            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Comment comment)
        {
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM report WHERE commentId = {0}", comment.CommentId);
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM comment WHERE commentId = {0}", comment.CommentId);
        }

    }
}