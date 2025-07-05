using backend.Models;

namespace backend.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentDto>> GetAllCommentAsync();
        Task<CommentDto?> GetCommentByIdAsync(int id);
        Task<CommentDto> CreateCommentAsync(CreateCommentDto dto);
        Task UpdateCommentAsync(int id, UpdateCommentDto dto);
        Task DeleteCommentAsync(int id);
        Task<ServiceAccessResult> CanUserCommentAsync(int userId);
        Task<ServiceAccessResult> CanUserModifyCommentAsync(int commentId);
    }
}
