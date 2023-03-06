namespace NModbusTCP.Models
{
    public class ParameterItemRequestData
    {
        public int parameterid { get; set; }
        public string parameterno { get; set; }
        public string text { get; set; }
        public string value { get; set; }
        public int? valueformat { get; set; }
        public int? ordernumber { get; set; }
        public string permission { get; set; }
        public string description { get; set; }
    }
}
