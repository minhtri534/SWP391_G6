using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }


        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest user)
        {
            // 1. Kiểm tra username đã tồn tại chưa
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.userName == user.UserName); // ⚠️ userName → UserName

            if (existingUser != null)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Username already exists."
                });
            }

            // 2. Tạo entity mới
            var newUser = new Registration
            {
                userName = user.UserName,
                password = user.Password
                // Bổ sung các thuộc tính khác nếu cần
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            // 3. Trả về phản hồi sau khi lưu thành công
            return Ok(new
            {
                success = true,
                message = "User registered successfully.",
                user = new
                {
                    newUser.userId,
                    newUser.userName
                }
            });
        }

    }
}
               
