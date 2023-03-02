
namespace NModbusRTU.Models
{
    #region Using Directives

    using NModbusLib.Models;

    #endregion

    /// <summary>
    /// Helper class to hold all Modbus request data.
    /// </summary>
    public class ModbusRequestData
    {
        /// <summary>
        /// The Modbus master data.
        /// </summary>
        public RtuMasterData Master { get; set; } = new RtuMasterData();

        /// <summary>
        /// The Modbus slave data.
        /// </summary>
        public RtuSlaveData Slave { get; set; } = new RtuSlaveData();

        /// <summary>
        /// The Modbus address of the first data item (offset).
        /// </summary>
        public ushort Offset { get; set; }

        /// <summary>
        /// The number of Modbus data items requested.
        /// </summary>
        public ushort Number { get; set; }
    }
}
