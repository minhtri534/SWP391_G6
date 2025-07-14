using Azure.Core;
using backend.Data;
using backend.Models;
using backend.Entity;
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
                .FirstOrDefaultAsync(u => u.UserName == user.UserName); 

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
                UserName = user.UserName,
                Password = user.Password,
                PhoneNum = user.PhoneNum,
                Age = user.Age,
                Gender = user.Gender,         
                Status = "Active",              
                RoleId = 2,                     
                JoinDate = DateTime.Now
               
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
                    newUser.UserId,
                    newUser.UserName
                }
            });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and password are required.");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == request.UserName && u.Password == request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var response = new LoginResponse
            {
                Message = "Login successful",
                UserId = user.UserId,
                RoleId = user.RoleId,
                UserName = user.UserName
            };

            return Ok(response);
        }



    }
}
               
