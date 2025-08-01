using backend.Models;
using backend.Entities;


namespace backend.Services
{
    public interface IPostService
    {
        Task<IEnumerable<PostDto>> GetAllPostsAsync();
        Task<List<PostDto>?> GetPostByIdAsync(int id);
        Task<PostDto> CreatePostAsync(CreatePostDto dto);
        Task UpdatePostAsync(int id, UpdatePostDto dto);
        Task DeletePostAsync(int id);
        Task<ServiceAccessResult> CanUserPostAsync(int userId);
        Task<ServiceAccessResult> CanUserModifyPostAsync(int postId);
        Task<IEnumerable<PostDto>> GetAllUnapprovedPostsAsync();
        Task<Post?> GetPostEntityByIdAsync(int id);
        Task ApprovePostAsync(Post? post);
    }
}
