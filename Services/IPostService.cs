using InteligyBackend.Dtos;

namespace InteligyBackend.Services
{
    public interface IPostService
    {
        Task<IEnumerable<PostDto>> GetAllPostsAsync();
        Task<PostDto> GetPostByIdAsync(int id);
        Task<PostDto> CreatePostAsync(CreatePostDto dto);
        Task UpdatePostAsync(int id, UpdatePostDto dto);
        Task DeletePostAsync(int id);

        // ✅ Add these two methods to fix the error
        Task<ServiceAccessResult> CanUserPostAsync(int userId);
        Task<ServiceAccessResult> CanUserModifyPostAsync(int postId);
    }
}
