using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NModbusLib;
using NModbusTCP.Data.Entities;
using NModbusTCP.Data.Infrastructure.Repository;
using NModbusTCP.Data.Maps;
using NModbusTCP.Data;
using NModbusTCP.Models;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.Swagger;
using System.Collections.Generic;
using System.Threading.Tasks;
using NModbusTCP.Data.Infrastructure.Service;
using System.Linq;

namespace NModbusTCP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ParametersController : ControllerBase
    {
        #region Constructors
        private readonly ParametersWithParameterItemsService<Parameters> _parametersWithParameterItemsService;
        public ParametersController(NModbusDbContext nModbusDbContext)
        {
            _parametersWithParameterItemsService = new ParametersWithParameterItemsService<Parameters>(nModbusDbContext);
        }

        #endregion


        [HttpGet]
        [SwaggerOperation(Tags = new[] { "Parameter operations" })]
        public async Task<IActionResult> ParameterList()
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                var data = await _parametersWithParameterItemsService.GetAllAsync();
                if (data == null) return NotFound("record is not found!");
                return Ok(data.OrderByDescending(x=>x.id));
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Tags = new[] { "Parameter operations" })]
        public async Task<IActionResult> ParameterGetById(int id)
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                var data = await _parametersWithParameterItemsService.GetByIDAsync(id);
                if (data == null) return NotFound("record is not found!");
                return Ok(data);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [SwaggerOperation(Tags = new[] { "Parameter operations" })]
        public async Task<IActionResult> CreateParameters(IEnumerable<ParameterRequestData> request)
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                List<Parameters> addList = new List<Parameters>();
                foreach (var item in request)
                {
                    var data = await _parametersWithParameterItemsService.AddAsync(nModbusMap.ParameterRequestDataToParameter(item));
                    _parametersWithParameterItemsService.saveChanges();
                    addList.Add(data);

                }
                return Ok(addList);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation(Tags = new[] { "Parameter operations" })]
        public async Task<IActionResult> UpdateParameters(int id, ParameterRequestData request)
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                var isExistingData = await _parametersWithParameterItemsService.GetByIDAsync(id);
                if (isExistingData == null) return NotFound("record is not found!");
                else
                {
                    if (!string.IsNullOrWhiteSpace(request.name) && request.name != isExistingData.name)
                        isExistingData.name = request.name;
                    if (!string.IsNullOrWhiteSpace(request.ipaddress) && request.ipaddress != isExistingData.ipaddress)
                        isExistingData.ipaddress = request.ipaddress;
                    if (!string.IsNullOrWhiteSpace(request.port) && request.port != isExistingData.port)
                        isExistingData.port = request.port;
                    if (!string.IsNullOrWhiteSpace(request.offset) && request.offset != isExistingData.offset)
                        isExistingData.offset = request.offset;
                    if (!string.IsNullOrWhiteSpace(request.slave) && request.slave != isExistingData.slave)
                        isExistingData.slave = request.slave;
                    if (!string.IsNullOrWhiteSpace(request.number) && request.number != isExistingData.number)
                        isExistingData.number = request.number;

                    var data = _parametersWithParameterItemsService.Update(isExistingData);
                    _parametersWithParameterItemsService.saveChanges();
                    return Ok(data);
                }
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Tags = new[] { "Parameter operations" })]
        public async Task<IActionResult> RemoveParameters(int id)
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                var isExistingData = await _parametersWithParameterItemsService.GetByIDAsync(id);
                if (isExistingData == null) return NotFound("record is not found!");
                else
                {
                    _parametersWithParameterItemsService.ParametersRemoveWithItems(id);
                    _parametersWithParameterItemsService.Remove(isExistingData);
                    _parametersWithParameterItemsService.saveChanges();
                    return Ok("Remove Successfly!");
                }
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
