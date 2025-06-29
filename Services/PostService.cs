using backend.Models;
using backend.Entities;
using backend.Repositories;
using backend.Data;

namespace backend.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _repo;
        private readonly AppDbContext _context;

        public PostService(IPostRepository repo, AppDbContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<IEnumerable<PostDto>> GetAllPostsAsync()
        {
            var posts = await _repo.GetAllAsync();
            return posts.Select(p => new PostDto
            {
                PostId = p.PostId,
                UserId = p.UserId,
                Title = p.Title,
                Content = p.Content,
                Create_date = p.Create_date
            });
        }

#       pragma warning disable CS8613 // Nullability of reference types in return type doesn't match implicitly implemented member.
        public async Task<List<PostDto>?> GetPostByIdAsync(int id)
        #pragma warning restore CS8613 // Nullability of reference types in return type doesn't match implicitly implemented member.
        {
            var post = await _repo.GetByUserIdAsync(id);
            #pragma warning disable CS8604 // Possible null reference argument.
            return post.Select(post => new PostDto
            {
                PostId = post.PostId,
                UserId = post.UserId,
                Title = post.Title,
                Content = post.Content,
                Create_date = post.Create_date
            }).ToList();
            #pragma warning restore CS8604 // Possible null reference argument.
        }

        public async Task<PostDto> CreatePostAsync(CreatePostDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                throw new Exception("User not found.");

            var post = new Post
            {
                UserId = dto.UserId,
                Title = dto.Title,
                Content = dto.Content,
                Create_date = DateTime.UtcNow.Date,
                User = user,
                Comments = new List<Comment>()
            };

            var result = await _repo.CreateAsync(post);

            return new PostDto
            {
                PostId = result.PostId,
                UserId = result.UserId,
                Title = result.Title,
                Content = result.Content,
                Create_date = result.Create_date
            };
        }

        public async Task UpdatePostAsync(int id, UpdatePostDto dto)
        {
            var post = await _repo.GetByIdAsync(id);
            if (post == null) return;

            post.Content = dto.Content;
            await _repo.UpdateAsync(post);
        }

        public async Task DeletePostAsync(int id)
        {
            var post = await _repo.GetByIdAsync(id);
            if (post == null) return;

            await _repo.DeleteAsync(post);
        }

        public async Task<ServiceAccessResult> CanUserPostAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return ServiceAccessResult.NotFound("User not found");
            if (user.roleId != 2 && user.roleId != 3)
                return ServiceAccessResult.Forbid("Only members or coaches can post.");
            return ServiceAccessResult.Ok();
        }

        public async Task<ServiceAccessResult> CanUserModifyPostAsync(int postId)
        {
            var post = await _repo.GetByIdAsync(postId);
            if (post == null) return ServiceAccessResult.NotFound("Post not found");

            var user = await _context.Users.FindAsync(post.UserId);
            if (user == null) return ServiceAccessResult.NotFound("User not found");
            if (user.roleId != 2 && user.roleId != 3)
                return ServiceAccessResult.Forbid("Only members or coaches can modify posts.");
            return ServiceAccessResult.Ok();
        }
    }
    
}
