using backend.Data;
using backend.Models;
using backend.Entities;
using backend.Repositories;

namespace backend.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _repository;
        private readonly AppDbContext _context;

        public CommentService(ICommentRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<CommentDto>> GetAllCommentAsync()
        {
            var comments = await _repository.GetAllAsync();
            return comments.Select(c => new CommentDto
            {
                CommentId = c.CommentId,
                PostId = c.PostId,
                UserId = c.UserId,
                Content = c.Content,
                Created_Date = c.Created_Date
            });
        }

        public async Task<CommentDto?> GetCommentByIdAsync(int id)
        {
            var comment = await _repository.GetByIdAsync(id);
            if (comment == null) return null;

            return new CommentDto
            {
                CommentId = comment.CommentId,
                PostId = comment.PostId,
                UserId = comment.UserId,
                Content = comment.Content,
                Created_Date = comment.Created_Date
            };
        }

        public async Task<CommentDto> CreateCommentAsync(CreateCommentDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            var post = await _context.Posts.FindAsync(dto.PostId);
            if (user == null || post == null)
                throw new Exception("User or Post not found.");

            var comment = new Comment
            {
                PostId = dto.PostId,
                UserId = dto.UserId,
                Content = dto.Content,
                Created_Date = DateTime.UtcNow,
                User = user,
                Post = post
            };

            await _repository.AddAsync(comment);

            return new CommentDto
            {
                CommentId = comment.CommentId,
                PostId = comment.PostId,
                UserId = comment.UserId,
                Content = comment.Content,
                Created_Date = comment.Created_Date
            };
        }

        public async Task UpdateCommentAsync(int id, UpdateCommentDto dto)
        {
            var comment = await _repository.GetByIdAsync(id);
            if (comment == null) return;

            comment.Content = dto.Content;
            await _repository.UpdateAsync(comment);
        }

        public async Task DeleteCommentAsync(int id)
        {
            var comment = await _repository.GetByIdAsync(id);
            if (comment == null) return;

            await _repository.DeleteAsync(comment);
        }

        public async Task<ServiceAccessResult> CanUserCommentAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return ServiceAccessResult.NotFound("User not found");
            if (user.RoleId != 2 && user.RoleId != 3)
                return ServiceAccessResult.Forbid("Only members or coaches can comment.");
            return ServiceAccessResult.Ok();
        }

        public async Task<ServiceAccessResult> CanUserModifyCommentAsync(int commentId)
        {
            var comment = await _repository.GetByIdAsync(commentId);
            if (comment == null) return ServiceAccessResult.NotFound("Comment not found");

            var user = await _context.Users.FindAsync(comment.UserId);
            if (user == null) return ServiceAccessResult.NotFound("User not found");
            if (user.RoleId != 2 && user.RoleId != 3)
                return ServiceAccessResult.Forbid("Only members or coaches can modify comments.");
            return ServiceAccessResult.Ok();
        }
    }
}
