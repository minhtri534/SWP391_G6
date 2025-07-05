using backend.Data;
using backend.Models;
using backend.Entities;
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
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.userName == user.UserName); 

            if (existingUser != null)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Username already exists."
                });
            }

            var role = await _context.Roles.FindAsync(2);
            if (role == null)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Role ID 2 not found in database."
                });
            }

            var newUser = new Registration
            {
                userName = user.UserName,
                password = user.Password,
                phoneNum = user.PhoneNum,
                age = user.Age,
                gender = user.Gender,
                status = "Active",
                roleId = 2,
                joinDate = DateTime.Now,
                Role = role,
                Posts = new List<Post>(),     // required
                Comments = new List<Comment>() // required
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and password are required.");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.userName == request.UserName && u.password == request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var response = new LoginResponse
            {
                Message = "Login successful",
                UserId = user.userId,
                RoleId = user.roleId,
                UserName = user.userName
            };

            return Ok(response);
        }
    }
}
