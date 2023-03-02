
namespace NModbusRTU.Models
{
    /// <summary>
    /// Helper class to define Modbus data values.
    /// </summary>
    public class ModbusDataValues<T> where T : new()
    {
        /// <summary>
        /// The array of Modbus data values.
        /// </summary>
        public T[] Values { get; set; } = new T[] { };
    }
}
