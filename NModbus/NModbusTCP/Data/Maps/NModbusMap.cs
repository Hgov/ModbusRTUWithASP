using NModbusTCP.Data.Entities;
using NModbusTCP.Models;

namespace NModbusTCP.Data.Maps
{
    public class NModbusMap
    {
        public Parameters ParameterRequestDataToParameter(ParameterRequestData request)
        {
            return new Parameters
            {
                name = request.name,
                ipaddress = request.ipaddress,
                port = request.port,
                slave = request.slave
            };
        }


        public ParameterRequestData ParameterToParameterRequestData(Parameters request)
        {
            return new ParameterRequestData
            {
                name = request.name,
                ipaddress = request.ipaddress,
                port = request.port,
                slave = request.slave
            };
        }


        public ParameterItems ParameterItemRequestDataToParameterItem(ParameterItemRequestData request)
        {
            return new ParameterItems
            {
                parameterid = (int)request.parameterid,
                parameterno = request.parameterno,
                title = request.title,
                unit = request.unit,
                decimalpoint = (int)request.decimalpoint,
                description = request.description,
                registerquantity = (int)request.registerquantity,
                permission = request.permission,
                registerid=(int)request.registerid,
            };
        }

        public ParameterItemRequestData ParameterItemToParameterItemRequestData(ParameterItems request)
        {
            return new ParameterItemRequestData
            {
                parameterid = (int)request.parameterid,
                parameterno = request.parameterno,
                title = request.title,
                unit = request.unit,
                decimalpoint = (int)request.decimalpoint,
                description = request.description,
                registerquantity = (int)request.registerquantity,
                permission = request.permission,
                registerid = (int)request.registerid,
            };
        }
    }
}
