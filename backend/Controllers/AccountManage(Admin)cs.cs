using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace backend.Controllers

{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountManageAdmin : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccountManageAdmin(AppDbContext context)
        {
            _context = context;
        }

        //VIEW ALL ACCOUNT
        [HttpGet("ViewAllAccount")]
        public IActionResult ViewAllAccount ()
        {
          var users  = _context.Users
                .Select(u => new {
                    u.UserId,
                    u.UserName,
                    u.Age,
                    u.Gender,
                    u.PhoneNum,
                    u.Role,
                    u.Status,
                    u.JoinDate
                })
            .ToList();

            return Ok(users);
        }
        //LOCK ACCOUNT//

        [HttpPut("LockAccount/{userId}")]
        public IActionResult LockAccount(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                return NotFound("User not exist");

            user.Status = "Locked";

            _context.SaveChanges();

            return Ok("The account has been locked");
        }

        //UNLOCK ACCOUNT//

        [HttpPut("UnlockAccount/{userId}")]
        public IActionResult UnlockAccount(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                return NotFound("User not exist");

            if (user.Status == "Locked")
                user.Status = "Unlocked";

            _context.SaveChanges();

            return Ok("The account has been unlocked");
        }


        //CREATE COACH ACCOUNT//

        [HttpPost("CreateCoachAcc")]
        //[Authorize(Roles = "Admin")]  
        public IActionResult CreateCoachAcc([FromBody] CreateCoachAccRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingUser = _context.Users.FirstOrDefault(u => u.UserName == request.Username);
            if (existingUser != null)
                return Conflict("This Username has been Registered");

            

            var coachUser = new User
            {
                UserName = request.Username,
                PhoneNum = request.PhoneNum,
                Password = request.Password, 
                Gender = request.Gender,
                Age = request.Age,
                RoleId = 3,  
                Status = "Active",
                JoinDate = DateTime.Now
            };

            _context.Users.Add(coachUser);
            _context.SaveChanges();

            var CoachInfo = new CoachInfo
            {
                PhoneNum = coachUser.PhoneNum,
                UserId = coachUser.UserId,
                Experience = request.Experience,
                AvailableTime = request.AvailableTime,
                Specialty = request.Specialty
            };
            _context.CoachInfos.Add(CoachInfo);
            _context.SaveChanges();
            return Ok("Coach account created successfully");
        }


        //DELETE ACCOUNT//
        [HttpDelete("DeleteAccount/{userId}")]
        public IActionResult DeleteAccount(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserId == userId);
            if (user == null)
                return NotFound("User not exist");

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok("Delete Account Successfully");
        }

    }

}