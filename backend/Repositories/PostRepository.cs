using backend.Data;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly AppDbContext _context;

        public PostRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Post>> GetAllAsync()
        {
            return await _context.Posts.Include(p => p.User).ToListAsync();
        }

        public async Task<Post?> GetByIdAsync(int id)
        {
            return await _context.Posts.FirstOrDefaultAsync(p => p.PostId == id);
        }


        public async Task<List<Post>?> GetByUserIdAsync(int id)
        {
            return await _context.Posts.Where(p => p.UserId == id).Include(p => p.User).ToListAsync();
        }

        public async Task<Post> CreateAsync(Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task UpdateAsync(Post post)
        {
            _context.Posts.Update(post);
            await _context.SaveChangesAsync();
        }

       public async Task DeleteAsync(int postId)
        {
            await _context.Database.ExecuteSqlRawAsync(@"
                DELETE r 
                FROM report r
                INNER JOIN comment c ON r.commentId = c.commentId
                WHERE c.postId = {0}", postId);
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM comment WHERE postId = {0}", postId);
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM post WHERE postId = {0}", postId);
        }


    }
}
