using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //Check username exists
            var existingUser = _context.Users.FirstOrDefault(u => u.userName == request.Username);
            if (existingUser != null)
                return Conflict("This Username has been Registered");

            // Confirm password match
            if (request.Password != request.ConfirmPassword)
                return BadRequest("Password and Confirm Password do not match.");

            var user = new User
            {               
                
                userName = request.Username,
                age = 18,      
                gender = "Male",  
                phoneNum = request.PhoneNum,
                password = request.Password,
                roleId = 2,
                status = "Active",  
                joinDate = DateTime.Now


            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Register successfully");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = _context.Users.FirstOrDefault(u => u.userName == request.Username);

            if (user == null || user.password != request.Password)
                return Unauthorized("Login failed");

            return Ok("Login successfully");
        }

// Nếu bạn có hệ thống xác thực, hoặc bỏ nếu chưa có
    [HttpPut("Update-profile/{userId}")]
        public IActionResult UpdateProfile(int userId, [FromBody] UpdateProfileRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = _context.Users.FirstOrDefault(u => u.userId == userId);
            if (user == null)
                return NotFound("User not found");

            user.age = request.Age;
            user.gender = request.Gender;
            user.phoneNum = request.PhoneNum;

            _context.SaveChanges();

            return Ok("Profile updated successfully");
        }

    }
}
