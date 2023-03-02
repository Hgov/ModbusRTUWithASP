
namespace NModbusTCP.Models
{
    /// <summary>
    /// Helper class to define Modbus data values.
    /// </summary>
    public class ModbusDataValues<T> where T : new()
    {
        #region Public Properties

        /// <summary>
        /// The array of Modbus data values.
        /// </summary>
        public T[] Values { get; set; } = System.Array.Empty<T>();

        #endregion
    }
}
