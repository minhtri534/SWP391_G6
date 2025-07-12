using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models;
public class CreateMembershipRequest
   
{
    [Required]
    [StringLength(100)]
    public string MembershipName { get; set; }


    [Column(TypeName = "decimal(10, 2)")]

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(1, int.MaxValue)]
    public int Duration { get; set; }
}
