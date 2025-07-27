namespace backend.Models { 
public class DailyProgressRequest
{
    public int UserId { get; set; }
    public string Note { get; set; }
    public bool No_Smoking { get; set; }
    public string Symptoms { get; set; }
    public DateTime Date { get; set; }

}
}