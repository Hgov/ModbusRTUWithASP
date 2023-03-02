
namespace NModbusTCP.Models
{
    #region Using Directives

    using NModbusLib.Models;
    using NModbusTCP.Swagger;

    #endregion

    /// <summary>
    /// Helper class to hold application specific settings.
    /// </summary>
    public class AppSettings : ITcpClientSettings
    {
        #region Public Properties

        /// <summary>
        /// The MODBUS TCP master configuration.
        /// </summary>
        public TcpMasterData TcpMaster { get; set; } = new TcpMasterData();

        /// <summary>
        /// The MODBUS TCP slave configuration.
        /// </summary>
        public TcpSlaveData TcpSlave { get; set; } = new TcpSlaveData();

        /// <summary>
        /// The Swagger options.
        /// </summary>
        public SwaggerOptionSettings Swagger { get; set; } = new SwaggerOptionSettings();

        #endregion
    }
}
