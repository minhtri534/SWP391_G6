using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[ApiController]
[Route("[controller]")]
public class MembershipController : ControllerBase
{
    private readonly AppDbContext _context;
    public MembershipController(AppDbContext context)
    {
        _context = context;
    }

    // VIEW MEMBERSHIP PLAN//

    [HttpGet("ViewMembershipPlan")]
    public ActionResult<IEnumerable<Membership>> GetMemberships()
    {
        var memberships = _context.Memberships.ToList();
        return Ok(memberships);
    }

    //CREATE MEMBEERSHIP PLAN//
    [HttpPost("CreateMembershipPlan")]
    public IActionResult CreateMembership([FromBody] CRUDMembershipRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var membership = new Membership
        {
            MembershipName = request.MembershipName,
            Price = request.Price,
            Duration = request.Duration
        };

        _context.Memberships.Add(membership);
        _context.SaveChanges();

        return Ok(new { message = "Membership plan created successfully", membershipId = membership.MembershipId });
    }
    //UPDATE MEMBERSHIP PLAN//
    [HttpPut("UpdateMembershipPlan/{membershipId}")]
    public IActionResult UpdateMembership(int membershipId, [FromBody] CRUDMembershipRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var membership = _context.Memberships.FirstOrDefault(m => m.MembershipId == membershipId);
        if (membership == null)
            return NotFound("Membership plan not found");
        membership.MembershipName = request.MembershipName;
        membership.Price = request.Price;
        membership.Duration = request.Duration;
        _context.SaveChanges();
        return Ok("Membership plan updated successfully");
    }
    //DELETE MEMBERSHIP PLAN//
    [HttpDelete("DeleteMembershipPlan/{membershipId}")]
    public IActionResult DeleteMembership(int membershipId)
    {
        var membership = _context.Memberships.FirstOrDefault(m => m.MembershipId == membershipId);
        if (membership == null)
            return NotFound("Membership plan not found");
        _context.Memberships.Remove(membership);
        _context.SaveChanges();
        return Ok("Membership plan deleted successfully");
    }
    [HttpPost("Buy")]
    public async Task<IActionResult> BuyMembership([FromBody] MembershipBuyRequest request)
    {
        var membership = await _context.Memberships
        .Where(a => a.MembershipId == request.MembershipId)
        .FirstOrDefaultAsync();

        if (membership == null)
        {
            return BadRequest(request.MembershipId + " MembershipId doesnt exist");
        }

        var check = await _context.UserMemberships
            .Where(a => a.UserId == request.UserId && a.End_Date.CompareTo(DateTime.Now) > 0)
            .FirstOrDefaultAsync();

        if (check != null)
        {
            return BadRequest("User already has an existing membership");
        }

        var endDate = DateTime.Now.AddDays(membership.Duration);

        var result = new UserMembership
        {
            UserId = request.UserId,
            MembershipId = request.MembershipId,
            Start_Date = DateTime.Now,
            End_Date = endDate
        };

        var user =  await _context.Users
            .Where(a => a.UserId == request.UserId)
            .FirstAsync();

        user.RoleId = 2;

        await _context.UserMemberships.AddAsync(result);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
