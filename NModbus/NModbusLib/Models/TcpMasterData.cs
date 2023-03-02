﻿
namespace NModbusLib.Models
{
    /// <summary>
    /// Helper class holding Modbus TCP communcation data.
    /// </summary>
    public class TcpMasterData
    {
        #region Public Properties

        public bool ExclusiveAddressUse { get; set; } = true;
        public int ReceiveTimeout { get; set; } = 1000;
        public int SendTimeout { get; set; } = 1000;

        #endregion
    }
}
