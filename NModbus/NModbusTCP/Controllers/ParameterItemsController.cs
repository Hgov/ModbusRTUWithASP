using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
using Microsoft.EntityFrameworkCore;

namespace NModbusTCP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ParameterItemsController : ControllerBase
    {
        #region Constructors
        private readonly ParametersWithParameterItemsService<ParameterItems> _parametersWithParameterItemsService;
        public ParameterItemsController(NModbusDbContext nModbusDbContext)
        {
            _parametersWithParameterItemsService = new ParametersWithParameterItemsService<ParameterItems>(nModbusDbContext);
        }

        #endregion


        [HttpGet]
        [SwaggerOperation(Tags = new[] { "Parameter items operations" })]
        public async Task<IActionResult> ParameterList()
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                var data = await _parametersWithParameterItemsService.GetAllAsync();
                if (data == null) return NotFound("record is not found!");
                return Ok(data);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Tags = new[] { "Parameter items operations" })]
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
        [SwaggerOperation(Tags = new[] { "Parameter items operations" })]
        public async Task<IActionResult> CreateParameters(IEnumerable<ParameterItemRequestData> request)
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                List<ParameterItems> addList = new List<ParameterItems>();
                foreach (var item in request)
                {
                    var parameterIsExisting = _parametersWithParameterItemsService.ParametersIsExisting(item.parameterid);
                    if (parameterIsExisting)
                    {
                        var data = await _parametersWithParameterItemsService.AddAsync(nModbusMap.ParameterItemRequestDataToParameterItem(item));
                        _parametersWithParameterItemsService.saveChanges();
                        addList.Add(data);
                    }
                    else
                    {
                        addList.Add(new ParameterItems { parameterid = item.parameterid, text = "Parameters not found!" });
                    }
                }
                return Ok(addList);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [SwaggerOperation(Tags = new[] { "Parameter items operations" })]
        public async Task<IActionResult> UpdateParameters(int id, ParameterItemRequestData request)
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                var isExistingData = await _parametersWithParameterItemsService.GetByIDAsync(id);
                if (isExistingData == null) return NotFound("record is not found!");
                else
                {
                    if (!string.IsNullOrWhiteSpace(request.parameterno) && request.parameterno != isExistingData.parameterno)
                        isExistingData.parameterno = request.parameterno;
                    if (!string.IsNullOrWhiteSpace(request.text) && request.text != isExistingData.text)
                        isExistingData.text = request.text;
                    if (!string.IsNullOrWhiteSpace(request.value) && request.value != isExistingData.value)
                        isExistingData.value = request.value;
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
        [SwaggerOperation(Tags = new[] { "Parameter items operations" })]
        public async Task<IActionResult> RemoveParameters(int id)
        {
            NModbusMap nModbusMap = new NModbusMap();
            try
            {
                var isExistingData = await _parametersWithParameterItemsService.GetByIDAsync(id);
                if (isExistingData == null) return NotFound("record is not found!");
                else
                {
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
