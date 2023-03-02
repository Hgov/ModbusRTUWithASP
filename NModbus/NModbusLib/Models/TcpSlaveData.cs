
namespace NModbusLib.Models
{
    /// <summary>
    /// Helper class holding Modbus TCP slave data.
    /// </summary>
    public class TcpSlaveData
    {
        #region Public Properties

        public string Address { get; set; } = "127.0.1.1";
        public int Port { get; set; } = 502;
        public byte ID { get; set; } = 1;

        #endregion
    }
}
