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
    public class AccountManageAdmin : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccountManageAdmin(AppDbContext context)
        {
            _context = context;
        }
        [HttpPut("LockAccount/{userId}")]
        public IActionResult LockAccount(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.userId == userId);
            if (user == null)
                return NotFound("User not exist");

            user.status = "Locked";

            _context.SaveChanges();

            return Ok("The account has been locked");
        }

        [HttpPut("UnlockAccount/{userId}")]
        public IActionResult UnlockAccount(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.userId == userId);
            if (user == null)
                return NotFound("User not exist");

            if (user.status == "Locked")
                user.status = "Unlocked";

            _context.SaveChanges();

            return Ok("The account has been unlocked");
        }

    }

}