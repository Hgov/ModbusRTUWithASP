
namespace NModbusRTU.Models
{
    #region Using Directives

    using NModbusLib.Models;
    using NModbusRTU.Swagger;

    #endregion

    /// <summary>
    /// Helper class to hold application specific settings.
    /// </summary>
    public class AppSettings : IRtuClientSettings
    {
        #region Public Properties

        /// <summary>
        /// The MODBUS RTU master configuration.
        /// </summary>
        public RtuMasterData RtuMaster { get; set; } = new RtuMasterData();

        /// <summary>
        /// The MODBUS RTU slave configuration.
        /// </summary>
        public RtuSlaveData RtuSlave { get; set; } = new RtuSlaveData();

        /// <summary>
        /// The Swagger options.
        /// </summary>
        public SwaggerOptionSettings Swagger { get; set; } = new SwaggerOptionSettings();

        #endregion
    }
}
