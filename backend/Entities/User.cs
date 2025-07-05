using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
	
namespace backend.Entities;
[Table("users")]

public class User
{
    [Key]
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int userId { get; set; }

	[StringLength(100)]
	[Required]
    public string userName { get; set; }

	
    public int age { get; set; }

	
	public string gender { get; set; }

	[Required]
	[MaxLength(10)]
	[RegularExpression(@"^0\d{9}$", ErrorMessage = "Phone number must start with 0 and contain exactly 10 digits.")]
	public string phoneNum { get; set; }

    [Required]
	[StringLength(100)]
	public string password { get; set; }
	
    [Required]
	[Range(0,2)]
	public int roleId { get; set; }

	
	[MaxLength(100)]
	public string status { get; set; }

	
	public DateTime joinDate { get; set; }
}

