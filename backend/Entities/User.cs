using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
	
namespace backend.Entities;
[Table("users")]

public class User
{
    [Key]
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }

	[StringLength(100)]
	[Required]
    public string UserName { get; set; }

	
    public int Age { get; set; } = default(int);


    public string Gender { get; set; } = String.Empty;

    [Required]
	[MaxLength(10)]
	[RegularExpression(@"^0\d{9}$", ErrorMessage = "Phone number must start with 0 and contain exactly 10 digits.")]
	public string PhoneNum { get; set; }

    [Required]
	[StringLength(100)]
	public string Password { get; set; }
	
    [Required]
	[Range(0,2)]
	public int RoleId { get; set; }

	
	[MaxLength(100)]
	public string Status { get; set; }

	
	public DateTime JoinDate { get; set; }
	[ForeignKey(nameof(RoleId))]
	public Role Role { get; set; }
}

