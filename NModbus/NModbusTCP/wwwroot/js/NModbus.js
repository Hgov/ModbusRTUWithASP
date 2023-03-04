
var NModbus = NModbus || {};
$(document).ready(function () {
    NModbus.Utility.Parameters();
});

var timer;

function start() {
    $(".btnconnect").removeClass("btn-success").addClass("btn-warning").html("Disconnect");
    NModbus.Utility.ReadHoldingRegisters();
    timer = setTimeout(start, 1000);
};

function stop() {
    clearTimeout(timer);
    NModbus.Static.Connect.IsConnect = false;
    $(".modbusdatalist").empty();
    $(".btnconnect").removeClass("btn-warning").addClass("btn-success").html("Connect");
};

/** Custom Button Events*/
$(".btnconnect").click(function () {
    NModbus.Static.Connect.ipaddress = $(".txtipaddress").val();
    NModbus.Static.Connect.slave = $(".txtslaveid").val();
    NModbus.Static.Connect.number = $(".txtnumber").val();
    NModbus.Static.Connect.offset = $(".txtoffset").val();
    NModbus.Static.Connect.port = $(".txtport").val();
    NModbus.Static.Connect.isauto = false;
    $(".btnconnect").removeClass("btn-success").addClass("btn-primary").html("Connecting");

    if (NModbus.Static.Connect.IsConnect) {
        stop();
    } else {
        start();
    }
})

$(".btnnewregister").click(function () {
    if (NModbus.Static.Connect.IsConnect) {
        NModbus.Static.UpdateData.newvalue = $(".txtnewvalue").val() * 100;
        NModbus.Static.UpdateData.offsetpoint = $(".txtoffsetpoint").val();
        NModbus.Utility.WriteHoldingRegisters();
    }
})

$(".slctparameter").on('change', function () {
    NModbus.Utility.ParameterItems(this.value);
    NModbus.Utility.ParametersGetById(this.value);
    NModbus.Static.Connect.isauto = true;
    if (this.value == 0) {
        stop();
        return;
    }
    stop();
    start();
})
/** Custom Button Events END*/


/** Utility */
NModbus.Utility = (function () {

    return {
        ReadHoldingRegisters: function () {
            $.ajax({
                url: ApiUrlParse("ReadHoldingRegisters"),//2?number=1&slave=1&ipaddress=127.0.0.1&port=502
                type: 'GET',
                dataType: 'json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    try {
                        $(".modbusconnectstate").html("");
                        $(".modbusdatalist").empty();
                        NModbus.Static.Connect.IsConnect = true;
                        $.each(data.values, function (index, item) {
                            var parameteritem = 0;
                            if (NModbus.Static.Connect.isauto == true) {
                                parameteritem = JSON.parse(NModbus.Static.ParameterItemsRealData.data).filter(record => record.ordernumber == index);
                                if (parameteritem.length != 0 && parameteritem != 0) {
                                    console.log(parameteritem[0].parameterid);
                                    $(".modbusdatalist").append('<tr>' +
                                        '<td><span class="tab">' + index + '</span></td>' +
                                        '<td>' + parameteritem[0].parameterno + '</td>' +
                                        '<td>' + parameteritem[0].text + '</td>' +
                                        '<td>' + (item / 100).toFixed(2) + ' ' + parameteritem[0].value + '</td>' +
                                        '<td>' + parameteritem[0].permission + '</td>' +
                                        '<td>' + parameteritem[0].description + '</td>' +
                                        '</tr>'
                                    );
                                }
                            }
                            else {
                                $(".modbusdatalist").append('<tr>' +
                                    '<td><span class="tab">' + index + '</span></td>' +
                                    '<td>-</td>' +
                                    '<td>-</td>' +
                                    '<td>' + (item / 100).toFixed(2) + '</td>' +
                                    '<td>-</td>' +
                                    '<td>-</td>' +
                                    '</tr>'
                                );
                            }
                        });
                    } catch (err) {
                        $(".modbusconnectstate").html(err.message);
                        stop();
                        return;
                    }
                },
                complete: function (xhr, textStatus) {
                    if (xhr.status == "400") {
                        $(".modbusconnectstate").html("the Modbus gateway cannot open the COM port.");
                        stop();
                    }
                    if (xhr.status == "403") {
                        $(".modbusconnectstate").html("the Modbus gateway has no access to the COM port.");
                        stop();
                    }
                    if (xhr.status == "404") {
                        $(".modbusconnectstate").html("the Modbus gateway cannot connect to the slave.");
                        stop();
                    }
                    if (xhr.status == "500") {
                        $(".modbusconnectstate").html("an error or an unexpected exception occurs.");
                        stop();
                    }
                    if (xhr.status == "502") {
                        $(".modbusconnectstate").html("an unexpected exception occurs in the slave.");
                        stop();
                    }
                },
                Error: function (data) {
                    $(".modbusconnectstate").html("Error");
                    stop();
                }
            })
        },
        WriteHoldingRegisters: function () {
            $.ajax({
                url: ApiUrlParse("WriteHoldingRegisters"),
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    $(".modbusconnectstate").html("");
                },
                complete: function (xhr, textStatus) {
                    if (xhr.status == "400") {
                        $(".modbusconnectstate").html("the Modbus gateway cannot open the COM port.");
                        $(".modbusdatalist").empty();
                    }
                    if (xhr.status == "403") {
                        $(".modbusconnectstate").html("the Modbus gateway has no access to the COM port.");
                        $(".modbusdatalist").empty();
                    }
                    if (xhr.status == "404") {
                        $(".modbusconnectstate").html("the Modbus gateway cannot connect to the slave.");
                        $(".modbusdatalist").empty();
                    }
                    if (xhr.status == "500") {
                        $(".modbusconnectstate").html("an error or an unexpected exception occurs.");
                        $(".modbusdatalist").empty();
                    }
                    if (xhr.status == "502") {
                        $(".modbusconnectstate").html("an unexpected exception occurs in the slave.");
                        $(".modbusdatalist").empty();
                    }
                },
                Error: function (data) {
                    $(".modbusconnectstate").html("Error");
                    $(".modbusdatalist").empty();
                }
            })

        },
        Parameters: function () {
            $.ajax({
                url: ApiUrlParse("Parameters"),
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    var slctparameters = $(".slctparameter");
                    slctparameters.empty();
                    slctparameters.append("<option value=0>registered connect</option>");
                    $.each(data, function (i, item) {
                        slctparameters.append("<option value=" + item.id + ">" + item.name + "</option>");
                    });
                },
                complete: function (xhr, textStatus) {
                },
                Error: function (data) {
                    $(".modbusconnectstate").html("Error");
                }
            });
        },
        ParametersGetById: function (parameterspoint) {
            NModbus.Static.ParametersData.parameterspoint = parameterspoint;
            $.ajax({
                url: ApiUrlParse("ParametersGetById"),
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    NModbus.Static.Connect.ipaddress = data.ipaddress;
                    NModbus.Static.Connect.slave = data.slave;
                    NModbus.Static.Connect.number = data.number;
                    NModbus.Static.Connect.offset = data.offset;
                    NModbus.Static.Connect.port = data.port;

                    if (NModbus.Static.Connect.IsConnect) {
                        stop();
                    } else {
                        start();
                    }
                },
                complete: function (xhr, textStatus) {
                },
                Error: function (data) {
                    $(".modbusconnectstate").html("Error");
                }
            });
        },
        ParameterItems: function (parameterid) {
            $.ajax({
                url: ApiUrlParse("ParameterItems"),
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    NModbus.Static.ParameterItemsRealData.data = JSON.stringify(data.filter(record => record.parameterid == parameterid));
                    // console.log(NModbus.Static.ParameterItemsRealData.data);
                },
                complete: function (xhr, textStatus) {
                },
                Error: function (data) {
                    $(".modbusconnectstate").html("Error");
                }
            });
        },
    }
})();
function ApiUrlParse(endpointparameter) {

    switch (endpointparameter) {
        case "ReadHoldingRegisters":
            return window.location.protocol + "//" + window.location.host + "/api/HoldingRegisters/" + NModbus.Static.Connect.offset + "?number=" + NModbus.Static.Connect.number + "&slave=" + NModbus.Static.Connect.slave + "&ipaddress=" + NModbus.Static.Connect.ipaddress + "&port=" + NModbus.Static.Connect.port;
            break;
        case "WriteHoldingRegisters":
            return window.location.protocol + "//" + window.location.host + '/api/HoldingRegister/' + NModbus.Static.UpdateData.offsetpoint + '?data=' + NModbus.Static.UpdateData.newvalue + '&slave=' + NModbus.Static.Connect.slave;
            break;
        case "Parameters":
            return window.location.protocol + "//" + window.location.host + '/api/Parameters';
            break;
        case "ParametersGetById":
            return window.location.protocol + "//" + window.location.host + '/api/Parameters/' + NModbus.Static.ParametersData.parameterspoint;
            break;
        case "ParameterItems":
            return window.location.protocol + "//" + window.location.host + '/api/ParameterItems';
            break;
    }

}
/**Utility END */

/** Static*/
NModbus.Static = NModbus.Static || {};

NModbus.Static = {
    Connect: {
        ipaddress: null,
        port: null,
        slave: null,
        number: null,
        offset: null,
        isconnect: false,
        isauto: false
    },
    UpdateData: {
        newvalue: null,
        offsetpoint: null,
    },
    ParametersData: {
        parameterspoint: null
    },
    ParameterItemsRealData: {
        data: null
    }
}
    /** Static END */