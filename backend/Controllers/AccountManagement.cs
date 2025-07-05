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
        public class AccountManagementController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccountManagementController(AppDbContext context)
        {
            _context = context;
        }

        //VIEW PROFILE//

        [HttpGet("ViewProfile")]
        public IActionResult GetProfile(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.userId == userId);
            if (user == null)
                return NotFound("User not found");

            return Ok(new
            {
                user.userId,
                user.userName,
                user.age,
                user.gender,
                user.phoneNum,
                user.joinDate
            });
        }

        //UPDATE PROFILE//
        [HttpPut("UpdateProfile/{userId}")]
            public IActionResult UpdateProfile(int userId, [FromBody] UpdateProfileRequest request)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = _context.Users.FirstOrDefault(u => u.userId == userId);
                if (user == null)
                    return NotFound("User not found");

                user.age = request.Age;
                user.gender = request.Gender;

                _context.SaveChanges();

                return Ok("Profile updated successfully");
            }

        //DELETE ACCOUNT//
            [HttpDelete("DeleteAccount/{userId}")]
            public IActionResult DeleteAccount(int userId)
            {
                var user = _context.Users.FirstOrDefault(u => u.userId == userId);
                if (user == null)
                    return NotFound("User not exist");

                _context.Users.Remove(user);
                _context.SaveChanges();

                return Ok("Delete Account Successfully");
            }

        }
    }

