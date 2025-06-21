using InteligyBackend.Data;
using InteligyBackend.Entities;
using Microsoft.EntityFrameworkCore;

namespace InteligyBackend.Repositories
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

        public async Task<Post> GetByIdAsync(int id)
        {
            #pragma warning disable CS8603 // Possible null reference return.
            return await _context.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.PostId == id);
            #pragma warning restore CS8603 // Possible null reference return.
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

        public async Task DeleteAsync(Post post)
        {
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }
    }
}
