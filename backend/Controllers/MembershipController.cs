using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

[ApiController]
[Route("[controller]")]
public class MembershipController : ControllerBase
{
    private readonly AppDbContext _context;
    public MembershipController (AppDbContext context)
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
}
