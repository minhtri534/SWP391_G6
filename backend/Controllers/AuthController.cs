using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

            var existingUser = _context.Users.FirstOrDefault(u => u.UserName == request.Username);
            if (existingUser != null)
                return Conflict("This Username has been Registered");

            if (request.Password != request.ConfirmPassword)
                return BadRequest("Password and Confirm Password do not match.");

            var user = new User
            {

                UserName = request.Username,
                PhoneNum = request.PhoneNum,
                Password = request.Password,
                RoleId = 2,
                Status = "Active",
                JoinDate = DateTime.Now


            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Register successfully");
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest  request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = _context.Users.FirstOrDefault(u => u.UserName == request.Username);

            if (user == null || user.Password != request.Password)
                return Unauthorized("Login failed");

            return Ok(new
            {
                message = "Login successfully",
                RoleId = user.RoleId
            });
        }


    }
}
