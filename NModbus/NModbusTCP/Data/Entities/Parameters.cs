using System.Collections.Generic;

namespace NModbusTCP.Data.Entities
{
    public class Parameters
    {
        public int id { get; set; }
        public string name { get; set; }
        public string ipaddress { get; set; }
        public string port { get; set; }
        public string slave { get; set; }
        public string offset { get; set; }
        public string number { get; set; }
        public virtual ICollection<ParameterItems> ParameterItems { get; set; }
    }
}
