using backend.Data;
using backend.Models;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FsCheck;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingPaymentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingPaymentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize(Roles = "2")]
        public async Task<IActionResult> SendTransactionBill([FromForm] BookingPaymentRequest request)
        {

            return Ok();
        }
        [HttpGet]
        [Authorize(Roles = "4")]
        public async Task<IActionResult> GetTransactionBill()
        {
            return Ok();
        }
        [HttpPut]
        [Authorize(Roles = "4")]
        public async Task<IActionResult> ConfirmTransaction([FromBody] int packageBookingId)
        {
            var result = await _context.UserCoachPackages
                .Where(a => a.PackageBookingId == packageBookingId)
                .FirstOrDefaultAsync();
            if (result == null)
            {
                return NotFound();
            }
            if (!result.Status.Equals("Pending"))
            {
                return BadRequest();
            }
            var package_months = _context.CoachPackages
                .Where(a => a.PackageId == result.PackageId)
                .Select(a => a.Duration_Months)
                .ToString();

            var months = int.Parse(package_months);

            result.Status = "Active";
            result.Start_Date = DateTime.Now;
            result.End_Date = result.Start_Date.Value.AddMonths(months);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
