﻿
namespace NModbusTCP.Models
{
    #region Using Directives

    using NModbusLib.Models;

    #endregion

    /// <summary>
    /// Helper class to hold all Modbus request data.
    /// </summary>
    public class ModbusRequestData
    {
        #region Public Properties

        /// <summary>
        /// The Modbus master data.
        /// </summary>
        public TcpMasterData Master { get; set; } = new TcpMasterData();

        /// <summary>
        /// The Modbus slave data.
        /// </summary>
        public TcpSlaveData Slave { get; set; } = new TcpSlaveData();

        /// <summary>
        /// The Modbus address of the first data item (offset).
        /// </summary>
        public ushort Offset { get; set; }

        /// <summary>
        /// The number of Modbus data items requested.
        /// </summary>
        public ushort Number { get; set; }

        #endregion
    }
}
