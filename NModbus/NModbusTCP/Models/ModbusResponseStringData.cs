
namespace NModbusTCP.Models
{
    /// <summary>
    /// Helper class to hold Modbus string response data.
    /// </summary>
    public class ModbusResponseStringData
    {
        #region Public Properties

        /// <summary>
        /// The Modbus request data.
        /// </summary>
        public ModbusRequestData Request { get; } = new ModbusRequestData();

        /// <summary>
        /// The Modbus data values.
        /// </summary>
        public string Value { get; } = string.Empty;

        #endregion

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ModbusResponseStringData"/> class.
        /// </summary>
        public ModbusResponseStringData() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ModbusResponseStringData"/> class.
        /// </summary>
        /// <param name="request">The Modbus request data.</param>
        /// <param name="value">The data value.</param>
        public ModbusResponseStringData(ModbusRequestData request, string value)
        {
            this.Request = request;
            this.Value = value;
        }

        #endregion
    }
}
