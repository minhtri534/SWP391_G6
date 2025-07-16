using backend.Data;
using backend.Models;
using backend.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;


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

            /*var response = new LoginResponse
            {
                Message = "Login successful",
                UserId = user.UserId,
                RoleId = user.RoleId,
                UserName = user.UserName
            };*/
            var response = GenerateJwtToken(user.UserName, user.RoleId);

            return Ok(response);
        }

        private string GenerateJwtToken(string username, int role)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(ClaimTypes.Role, role.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("very_important_smoking_encryption_key"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5196",
                //audience: "http://localhost:5174",
                audience: "http://localhost:5196/Swagger",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}

