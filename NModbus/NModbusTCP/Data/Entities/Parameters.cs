using System.Collections.Generic;

namespace NModbusTCP.Data.Entities
{
    public class Parameters
    {
        public int id { get; set; }
        public string name { get; set; }
        public virtual ICollection<ParameterItems> ParameterItems { get; set; }
    }
}
