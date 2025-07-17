namespace backend.Models
{
    public class PaymentRequest
    {
        public decimal Amount { get; set; }
        public string CardNumber { get; set; }
        public string Cvv { get; set; }
        public string Expiry { get; set; }
    }
}
