
var NModbus = NModbus || {};
/** variables */

/** variables */
$(document).ready(function () {
    NModbus.Utility.slctparameterOptionFetch();
});

var timer;

function start() {
    $(".btnconnect").removeClass("btn-success").addClass("btn-warning").html("Disconnect");
    NModbus.Static.Connect.IsConnect = true;
    timer = setTimeout(function () { start(); NModbus.Utility.ReadHoldingRegisters(); }, 1000);
    //NModbus.Utility.ReadHoldingRegisters();
};

function stop() {
    clearTimeout(timer);
    NModbus.Static.Connect.IsConnect = false;
    $(".modbusdata").empty();
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
        NModbus.Static.UpdateData.newvalue = $(".txtnewvalue").val();
        NModbus.Static.UpdateData.offsetpoint = $(".txtoffsetpoint").val();
        NModbus.Utility.WriteHoldingRegisters();
    }
})

$(".slctparameter").on('change', function () {
    NModbus.Static.Connect.isauto = true;
    NModbus.Static.ParametersData.parameterid = this.value;
    NModbus.Utility.ParametersGetById(NModbus.Static.ParametersData.parameterid);
    $.when(NModbus.Utility.ParameterItems(NModbus.Static.ParametersData.parameterid)).then(function () {
        stop();
        start();
    }, function () {
        stop();
    });

})
/** Custom Button Events END*/


/** Utility */
NModbus.Utility = (function () {
    var slctparameterOptionFetch = function () {
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
    }
    var ReadHoldingRegisters = function () {
        var html = '';
        var row = '';

        var parameteritem = '';
        if (NModbus.Static.Connect.isauto) {
            var parameterItemsJson = NModbus.Static.ParameterItems.data;
            $(".modbusdata").empty();
            $.each(parameterItemsJson, function (index, item) {
                for (var i = 0; i < item.registerquantity; i++) {

                    NModbus.Static.Connect.number = 1;
                    NModbus.Static.Connect.offset = item.registerid + i;
                    $.ajax({
                        url: ApiUrlParse("ReadHoldingRegisters"),
                        type: 'GET',
                        dataType: 'json',
                        data: '{}',
                        async: false,
                        success: function (data, textStatus, xhr) {
                            $(".modbusconnectstate").html("");
                            console.log(JSON.stringify(index + " " + data.values[0]))
                            if (i == 0) {
                                console.log(JSON.stringify(parameterItemsJson[index]));
                                row += '<tr>' +
                                    '<td><span class="tab">' + NModbus.Static.Connect.offset + '</span></td>' +
                                    '<td>' + parameterItemsJson[index].parameterno + '</td>' +
                                    '<td>' + parameterItemsJson[index].title + '</td>' +
                                    '<td>' + parseFloat(data.values[0] / 100).toFixed(parameterItemsJson[index].decimalpoint) + ' ' + parameterItemsJson[index].unit + '</td>' +
                                    '<td>' + parameterItemsJson[index].permission + '</td>' +
                                    '<td>' + parameterItemsJson[index].description + '</td>' +
                                    '</tr>';
                            } else {
                                row += '<tr>' +
                                    '<td><span class="tab">' + NModbus.Static.Connect.offset + '</span></td>' +
                                    '<td>' + parameterItemsJson[index].parameterno + '</td>' +
                                    '<td>' + parameterItemsJson[index].title + '</td>' +
                                    '<td>' + parseFloat(data.values[0] / 100).toFixed(parameterItemsJson[index].decimalpoint) + ' ' + parameterItemsJson[index].unit + '</td>' +
                                    '<td>' + parameterItemsJson[index].permission + '</td>' +
                                    '<td>' + parameterItemsJson[index].description + '</td>' +
                                    '</tr>';
                            }

                        },
                        complete: function (xhr, textStatus) {

                            if (xhr.status == "400") {
                                $(".modbusconnectstate").html("the Modbus gateway cannot open the COM port.");
                            }
                            if (xhr.status == "403") {
                                $(".modbusconnectstate").html("the Modbus gateway has no access to the COM port.");
                            }
                            if (xhr.status == "404") {
                                $(".modbusconnectstate").html("the Modbus gateway cannot connect to the slave.");
                            }
                            if (xhr.status == "500") {
                                $(".modbusconnectstate").html("an error or an unexpected exception occurs.");
                            }
                            if (xhr.status == "502") {
                                $(".modbusconnectstate").html("an unexpected exception occurs in the slave.");
                            }
                            if (xhr.status != "200") {
                                stop();
                                return;
                            }
                        },
                        Error: function (data) {
                            $(".modbusconnectstate").html("Error");
                            stop();
                        }
                    });
                }
            });
            html = '<table class="table">' +
                '<thead>' +
                '    <tr>' +
                '        <td>Register Id</td>' +
                '        <td>Parameter No.</td>' +
                '        <td>Title</td>' +
                '        <td>Value</td>' +
                '        <td>Permission</td>' +
                '        <td>Description</td>' +
                '    </tr>' +
                '</thead>' +
                '<tbody>' + row + '</tbody>' +
                '</table>';
            $(".modbusdata").append(html);
            // console.log(parameterItemsJson);
            //for (var i = 0; i < parameterItemsJson.registerquantity; i++) {

            //}
            //parameteritem = JSON.parse(NModbus.Static.ParameterItems.data).filter(record => record.registerid == index);

            //if (parameteritem.length != 0 && parameteritem != 0) {
            //    console.log(parameteritem[0].parameterid);
            //    $(".modbusdata").append('<tr>' +
            //        '<td><span class="tab">' + NModbus.Static.counter + '</span></td>' +
            //        '<td>' + parameteritem[0].parameterno + '</td>' +
            //        '<td>' + parameteritem[0].title + '</td>' +
            //        '<td>' + parseFloat(item / 100).toFixed(parameteritem[0].decimalpoint) + ' ' + parameteritem[0].unit + '</td>' +
            //        '<td>' + parameteritem[0].permission + '</td>' +
            //        '<td>' + parameteritem[0].description + '</td>' +
            //        '</tr>'
            //    );
        }
        else {
            $.ajax({
                url: ApiUrlParse("ReadHoldingRegisters"),
                type: 'GET',
                dataType: 'json',
                data: '{}',
                async: false,
                success: function (data, textStatus, xhr) {
                    $(".modbusconnectstate").html("");
                    $(".modbusdata").empty();
                    NModbus.Static.counter = NModbus.Static.Connect.offset;
                    $.each(data.values, function (index, item) {
                        row += '<tr>' +
                            '<td>' + NModbus.Static.counter + '</td>' +
                            '<td>' + item + '</td>' +
                            '</tr>';
                        NModbus.Static.counter = parseInt(NModbus.Static.counter) + 1;
                    });
                    html = '<table class="table">' +
                        '<thead>' +
                        '    <tr>' +
                        '        <td>Register Id</td>' +
                        '        <td>Value</td>' +
                        '    </tr>' +
                        '</thead>' +
                        '<tbody>' + row + '</tbody>' +
                        '</table>';
                    $(".modbusdata").append(html);
                },
                complete: function (xhr, textStatus) {
                    if (xhr.status == "400") {
                        $(".modbusconnectstate").html("the Modbus gateway cannot open the COM port.");
                    }
                    if (xhr.status == "403") {
                        $(".modbusconnectstate").html("the Modbus gateway has no access to the COM port.");
                    }
                    if (xhr.status == "404") {
                        $(".modbusconnectstate").html("the Modbus gateway cannot connect to the slave.");
                    }
                    if (xhr.status == "500") {
                        $(".modbusconnectstate").html("an error or an unexpected exception occurs.");
                    }
                    if (xhr.status == "502") {
                        $(".modbusconnectstate").html("an unexpected exception occurs in the slave.");
                    }
                    if (xhr.status != "200") {
                        stop();
                    }

                },
                Error: function (data) {
                    $(".modbusconnectstate").html("Error");
                    stop();
                }
            })
        }



    }
    var WriteHoldingRegisters = function () {
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
                }
                if (xhr.status == "403") {
                    $(".modbusconnectstate").html("the Modbus gateway has no access to the COM port.");
                }
                if (xhr.status == "404") {
                    $(".modbusconnectstate").html("the Modbus gateway cannot connect to the slave.");
                }
                if (xhr.status == "500") {
                    $(".modbusconnectstate").html("an error or an unexpected exception occurs.");
                }
                if (xhr.status == "502") {
                    $(".modbusconnectstate").html("an unexpected exception occurs in the slave.");
                }
                $(".modbusdata").empty();
            },
            Error: function (data) {
                $(".modbusconnectstate").html("Error");
                $(".modbusdata").empty();
            }
        })

    }

    var ParametersGetById = function (parameterid) {

        $.ajax({
            url: ApiUrlParse("ParametersGetById"),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            data: '{}',
            async: false,
            success: function (data, textStatus, xhr) {
                NModbus.Static.Connect.ipaddress = data.ipaddress;
                NModbus.Static.Connect.slave = data.slave;
                NModbus.Static.Connect.port = data.port;
            },
            complete: function (xhr, textStatus) {
            },
            Error: function (data) {
                $(".modbusconnectstate").html("Error");
            }
        });
    }
    var ParameterItems = function (parameterid) {
        $.ajax({
            url: ApiUrlParse("ParameterItems"),
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            data: '{}',
            success: function (data, textStatus, xhr) {
                if (data.length == 0 || parameterid == '0') {
                    $(".modbusconnectstate").html("No element found for this parameter");
                    stop();
                    return;
                }
                NModbus.Static.ParameterItems.data = data.filter(record => record.parameterid == parameterid);
            },
            complete: function (xhr, textStatus) {
            },
            Error: function (data) {
                $(".modbusconnectstate").html("Error");
                stop();
            }
        });
    }
    return {
        ReadHoldingRegisters,
        WriteHoldingRegisters,
        slctparameterOptionFetch,
        ParametersGetById,
        ParameterItems
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
            return window.location.protocol + "//" + window.location.host + '/api/Parameters/' + NModbus.Static.ParametersData.parameterid;
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
    counter: 0,
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
        parameterid: null
    },
    ParameterItems: {
        data: null
    }
}
    /** Static END */