
namespace NModbusTCP.Models
{
    /// <summary>
    /// Helper class to hold all Modbus response data.
    /// </summary>
    public class ModbusResponseArrayData<T> where T : new()
    {
        #region Public Properties

        /// <summary>
        /// The Modbus request data.
        /// </summary>
        public ModbusRequestData Request { get; } = new ModbusRequestData();

        /// <summary>
        /// The Modbus data values.
        /// </summary>
        public T[] Values { get; } = System.Array.Empty<T>();

        #endregion

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="ModbusResponseArrayData&lt;T&gt;"/> class.
        /// </summary>
        public ModbusResponseArrayData() { }

        /// <summary>
        /// Initializes a new instance of the <see cref="ModbusResponseArrayData&lt;T&gt;"/> class.
        /// </summary>
        /// <param name="request">The Modbus request data.</param>
        /// <param name="values">The array of data values.</param>
        public ModbusResponseArrayData(ModbusRequestData request, T[] values)
        {
            this.Request = request;
            this.Values = values;
        }

        #endregion
    }
}
