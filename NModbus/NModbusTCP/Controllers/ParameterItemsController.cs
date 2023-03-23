using Microsoft.AspNetCore.Mvc;
using NModbusTCP.Data;
using NModbusTCP.Data.Entities;
using NModbusTCP.Data.Infrastructure.Service;
using NModbusTCP.Data.Maps;
using NModbusTCP.Models;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Threading.Tasks;

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
                    var parameterIsExisting = _parametersWithParameterItemsService.ParametersIsExisting((int)item.parameterid);
                    if (parameterIsExisting)
                    {
                        var data = await _parametersWithParameterItemsService.AddAsync(nModbusMap.ParameterItemRequestDataToParameterItem(item));
                        _parametersWithParameterItemsService.saveChanges();
                        addList.Add(data);
                    }
                    else
                    {
                        addList.Add(new ParameterItems { parameterid = (int)item.parameterid, title = "Parameters not found!" });
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
                    if (request.registerid != null && request.registerid != isExistingData.registerid)
                        isExistingData.registerid = (int)request.registerid;
                    if (!string.IsNullOrWhiteSpace(request.title) && request.title != isExistingData.title)
                        isExistingData.title = request.title;
                    if (!string.IsNullOrWhiteSpace(request.unit) && request.unit != isExistingData.unit)
                        isExistingData.unit = request.unit;
                    if (request.decimalpoint != null && request.decimalpoint != isExistingData.decimalpoint)
                        isExistingData.decimalpoint = (int)request.decimalpoint;
                    if (request.registerquantity != null && request.registerquantity != isExistingData.registerquantity)
                        isExistingData.registerquantity = (int)request.registerquantity;
                    if (!string.IsNullOrWhiteSpace(request.description) && request.description != isExistingData.description)
                        isExistingData.description = request.description;
                    if (!string.IsNullOrWhiteSpace(request.permission) && request.permission != isExistingData.permission)
                        isExistingData.permission = request.permission;


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
