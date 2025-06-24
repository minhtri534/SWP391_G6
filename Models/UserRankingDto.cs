namespace backend.Models
{
    public class UserRankingDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int NoSmokingDays { get; set; }
    }
}