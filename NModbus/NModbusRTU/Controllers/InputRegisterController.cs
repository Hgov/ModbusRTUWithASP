
namespace NModbusRTU.Controllers
{
    #region Using Directives

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using NModbusLib;
    using NModbusRTU.Models;
    using Swashbuckle.AspNetCore.Annotations;
    using System.Threading.Tasks;

    #endregion

    /// <summary>
    /// The Modbus Gateway MVC Controller for reading input registers.
    /// </summary>
    /// <para>
    ///     Read Input Registers            (fc 4)
    /// </para>
    [Route("api/[controller]")]
    [ApiController]

    public class InputRegisterController : ModbusController
    {
        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="InputRegisterController"/> class.
        /// </summary>
        /// <param name="client">The Modbus client instance.</param>
        /// <param name="options">The application options.</param>
        /// <param name="logger">The application logger.</param>
        public InputRegisterController(IRtuClient client,
                              IOptions<AppSettings> options,
                              ILogger<CoilController> logger)
            : base(client, options, logger)
        { }

        #endregion

        /// <summary>
        /// Reading a single input register from a Modbus slave.
        /// </summary>
        /// <param name="offset">The Modbus address (offset) of the data item.</param>
        /// <param name="slave">The slave ID of the Modbus TCP slave.</param>
        /// <returns>The action method result.</returns>
        /// <response code="200">Returns the request data and the input register values.</response>
        /// <response code="400">If the Modbus gateway cannot open the COM port.</response>
        /// <response code="403">If the Modbus gateway has no access to the COM port.</response>
        /// <response code="404">If the Modbus gateway cannot connect to the slave.</response>
        /// <response code="500">If an error or an unexpected exception occurs.</response>
        /// <response code="502">If an unexpected exception occurs in the slave.</response>
        [HttpGet("{offset}")]
        [SwaggerOperation(Tags = new[] { "Holding & Input Registers" })]
        [ProducesResponseType(typeof(ModbusResponseData<ushort>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> ReadInputRegisterAsync(ushort offset = 0, byte? slave = null)
        {
            ModbusRequestData request = new ModbusRequestData()
            {
                Slave = _client.RtuSlave,
                Master = _client.RtuMaster,
                Offset = offset,
                Number = 1
            };

            if (slave.HasValue) request.Slave.ID = slave.Value;

            return await ModbusReadRequest(request, "ReadInputRegisterAsync");
        }
    }
}
