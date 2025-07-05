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
    public IActionResult CreateMembership([FromBody] CreateMembershipRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var membership = new Membership
        {
            membershipName = request.MembershipName,
            price = request.Price,
            duration = request.Duration
        };

        _context.Memberships.Add(membership);
        _context.SaveChanges();

        return Ok(new { message = "Membership plan created successfully", membershipId = membership.membershipId });
    }
}
