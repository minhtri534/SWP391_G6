using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
	
namespace backend.Entities;
[Table("users")]

public class User
{
    [Key]
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	[Column("userId")]
    public int UserId { get; set; }
	[StringLength(100)]
	[Column("userName")]
    public string UserName { get; set; }
	[Column("age")]
    public int Age { get; set; } = default(int);
	[Column("gender")]
    public string Gender { get; set; } = String.Empty;
	[Column("phoneNum")]
    public string PhoneNum { get; set; }
	[Column("password")]
    [StringLength(100)]
	public string Password { get; set; }
	[Column("roleId")]
    public int RoleId { get; set; }
	[Column("status")]
    [MaxLength(100)]
	public string Status { get; set; }
	[Column("joinDate")]
    public DateTime JoinDate { get; set; }
	[ForeignKey(nameof(RoleId))]
	public Role Role { get; set; }
}

