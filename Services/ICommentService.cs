using InteligyBackend.Dtos;

namespace InteligyBackend.Services
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentDto>> GetAllAsync();
        Task<CommentDto?> GetByIdAsync(int id);
        Task<CommentDto> CreateAsync(CreateCommentDto dto);
        Task UpdateAsync(int id, UpdateCommentDto dto);
        Task DeleteAsync(int id);
        Task<ServiceAccessResult> CanUserCommentAsync(int userId);
        Task<ServiceAccessResult> CanUserModifyCommentAsync(int commentId);
    }
}
