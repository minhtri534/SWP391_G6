using backend.Data;
using backend.Entities;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

        [ApiController]
        [Route("[controller]")]
        public class CRUDMilestoneController : ControllerBase
        {
            private readonly AppDbContext _context;
            public CRUDMilestoneController(AppDbContext context)
            {
                _context = context;
            }
            [Authorize(Roles = "3,4")]
            [HttpPost("CreateMilestone")]
            public IActionResult CreateMilestone([FromBody] PlanMilestoneRequest request)
            {
                if (request == null || request.PlanId <= 0 || request.BadgeId <= 0)
                {
                    return BadRequest("Invalid request data.");
                }
                var milestone = new PlanMilestone
                {
                    PlanId = request.PlanId,
                    BadgeId = request.BadgeId,
                    Title = request.Title,
                    Description = request.Description,
                    TargetDate = DateTime.Now,
                };
                _context.PlanMilestones.Add(milestone);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetMilestoneById), new { id = milestone.MilestoneId }, milestone);
            }
            [Authorize]
            [HttpGet("ViewMilestoneById,{id}")]
            public IActionResult GetMilestoneById(int id)
            {
                var milestone = _context.PlanMilestones.Find(id);
                if (milestone == null)
                {
                    return NotFound();
                }
                return Ok(milestone);
            }
            [Authorize(Roles = "3,4")]
            [HttpPut("UpdateMileStone{id}")]
            public IActionResult UpdateMilestone(int id, [FromBody] PlanMilestoneRequest request)
            {
                if (request == null || id != request.MilestoneId)
                {
                    return BadRequest("Invalid request data.");
                }
                var milestone = _context.PlanMilestones.Find(id);
                if (milestone == null)
                {
                    return NotFound("Cant find Id");
                }
                milestone.Title = request.Title;
                milestone.Description = request.Description;
                milestone.BadgeId = request.BadgeId;
                _context.SaveChanges();
                return Ok("Updated Milestone successfull");
            }
            [Authorize(Roles = "3,4")]
            [HttpDelete("DeleteMilestone{id}")]
            public IActionResult DeleteMilestone(int id)
            {
                var milestone = _context.PlanMilestones.Find(id);
                if (milestone == null)
                {
                    return NotFound();
                }
                _context.PlanMilestones.Remove(milestone);
                _context.SaveChanges();
                return Ok("Delete Milestone Successfully");
            }
        }
    

