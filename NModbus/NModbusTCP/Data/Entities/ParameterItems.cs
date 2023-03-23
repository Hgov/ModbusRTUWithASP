using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace NModbusTCP.Data.Entities
{
    public class ParameterItems
    {
        public int id { get; set; }
        public int parameterid { get; set; }
        public int registerid { get; set; }
        public int registerquantity { get; set; }
        public string parameterno { get; set; }
        public string title { get; set; }
        public string unit { get; set; }
        public int decimalpoint { get; set; }
        public string permission { get; set; }
        public string description { get; set; }
        [ForeignKey("id")]
        [JsonIgnore]
        public Parameters Parameters { get; set; }
    }
}
