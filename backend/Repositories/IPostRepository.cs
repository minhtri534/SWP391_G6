using backend.Entities;

namespace backend.Repositories
{
    public interface IPostRepository
    {
        Task<IEnumerable<Post>> GetAllAsync();
        Task<Post?> GetByIdAsync(int id);
        Task<List<Post>?> GetByUserIdAsync(int userId);
        Task<Post> CreateAsync(Post post);
        Task UpdateAsync(Post post);
        Task DeleteAsync(int postId);
    }

}
