using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SmokingStatusController : ControllerBase
    {
        private readonly AppDbContext _context;
        public SmokingStatusController(AppDbContext context)
        {
            _context = context;
        }
    }
}
