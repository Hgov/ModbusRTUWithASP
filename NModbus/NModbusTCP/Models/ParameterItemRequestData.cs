namespace NModbusTCP.Models
{
    public class ParameterItemRequestData
    {
        public int? parameterid { get; set; }
        public int? registerid { get; set; }
        public int? registerquantity { get; set; }
        public string parameterno { get; set; }
        public string title { get; set; }
        public string unit { get; set; }
        public int? decimalpoint { get; set; }
        public string permission { get; set; }
        public string description { get; set; }
    }
}
