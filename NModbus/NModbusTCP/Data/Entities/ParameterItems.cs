using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace NModbusTCP.Data.Entities
{
    public class ParameterItems
    {
        public int id { get; set; }
        public string parameterno { get; set; }
        public string text { get; set; }
        public string value { get; set; }
        public int parameterid { get; set; }
        [ForeignKey("id")]
        [JsonIgnore]
        public Parameters Parameters { get; set; }
    }
}
