using Microsoft.AspNetCore.Mvc;

namespace backend.Models
{
    public class ServiceAccessResult
    {
        public bool Allowed { get; set; }
        public IActionResult ErrorResult { get; set; } = new ForbidResult();

        public static ServiceAccessResult Ok() => new() { Allowed = true };
        public static ServiceAccessResult Forbid(string message = "Forbidden") =>
            new() { Allowed = false, ErrorResult = new ObjectResult(message) { StatusCode = 403 } };
        public static ServiceAccessResult NotFound(string message = "Not found") =>
            new() { Allowed = false, ErrorResult = new NotFoundObjectResult(message) };
    }
}
