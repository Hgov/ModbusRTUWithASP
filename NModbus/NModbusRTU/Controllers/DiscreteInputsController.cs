
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
    /// The Modbus Gateway MVC Controller for reading discrete inputs.
    /// </summary>
    /// <para>
    ///     Read Discrete Inputs            (fc 2)
    /// </para>
    [Route("api/[controller]")]
    [ApiController]

    public class DiscreteInputsController : ModbusController
    {
        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="DiscreteInputsController"/> class.
        /// </summary>
        /// <param name="client">The Modbus client instance.</param>
        /// <param name="options">The application options.</param>
        /// <param name="logger">The application logger.</param>
        public DiscreteInputsController(IRtuClient client,
                              IOptions<AppSettings> options,
                              ILogger<CoilController> logger)
            : base(client, options, logger)
        { }

        #endregion

        /// <summary>
        /// Reading multiple discrete inputs from a Modbus slave.
        /// </summary>
        /// <param name="offset">The Modbus address (offset) of the first data item.</param>
        /// <param name="number">The number of the Modbus data items.</param>
        /// <param name="slave">The slave ID of the Modbus TCP slave.</param>
        /// <returns>The action method result.</returns>
        /// <response code="200">Returns the request data and the array of discrete inputs.</response>
        /// <response code="400">If the Modbus gateway cannot open the COM port.</response>
        /// <response code="403">If the Modbus gateway has no access to the COM port.</response>
        /// <response code="404">If the Modbus gateway cannot connect to the slave.</response>
        /// <response code="500">If an error or an unexpected exception occurs.</response>
        /// <response code="502">If an unexpected exception occurs in the slave.</response>
        [HttpGet("{offset}")]
        [SwaggerOperation(Tags = new[] { "Coils & Discrete Inputs" })]
        [ProducesResponseType(typeof(ModbusResponseArrayData<bool>), 200)]
        [ProducesResponseType(typeof(string), 400)]
        [ProducesResponseType(typeof(string), 403)]
        [ProducesResponseType(typeof(string), 404)]
        [ProducesResponseType(typeof(string), 500)]
        [ProducesResponseType(typeof(string), 502)]
        public async Task<IActionResult> ReadInputsAsync(ushort offset = 0, ushort number = 1, byte? slave = null)
        {
            ModbusRequestData request = new ModbusRequestData()
            {
                Slave = _client.RtuSlave,
                Master = _client.RtuMaster,
                Offset = offset,
                Number = number
            };

            if (slave.HasValue) request.Slave.ID = slave.Value;

            return await ModbusReadRequest(request, "ReadInputsAsync");
        }
    }
}
