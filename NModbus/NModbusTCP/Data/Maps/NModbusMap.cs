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
                number = request.number,
                offset = request.offset,
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
                number = request.number,
                offset = request.offset,
                port = request.port,
                slave = request.slave
            };
        }


        public ParameterItems ParameterItemRequestDataToParameterItem(ParameterItemRequestData request)
        {
            return new ParameterItems
            {
                parameterid = request.parameterid,
                parameterno = request.parameterno,
                text = request.text,
                value = request.value,
                description = request.description,
                ordernumber = request.ordernumber,
                permission = request.permission,
            };
        }

        public ParameterItemRequestData ParameterItemToParameterItemRequestData(ParameterItems request)
        {
            return new ParameterItemRequestData
            {
                parameterid = request.parameterid,
                parameterno = request.parameterno,
                text = request.text,
                value = request.value,
                description = request.description,
                ordernumber = request.ordernumber,
                permission = request.permission,
            };
        }
    }
}
