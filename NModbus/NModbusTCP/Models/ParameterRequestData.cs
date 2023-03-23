namespace NModbusTCP.Models
{
    public class ParameterRequestData
    {
        public string name { get; set; }
        public string ipaddress { get; set; }
        public string port { get; set; }
        public string slave { get; set; }
    }
}
