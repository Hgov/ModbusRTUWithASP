
var NModbus = NModbus || {};
$(document).ready(function () {
   // Utility.Parameters();
});

var timer;

function start() {
    $(".btnconnect").removeClass("btn-success").addClass("btn-warning").html("Disconnect");
    Utility.ReadHoldingRegisters();
    timer = setTimeout(start, 1000);
};

function stop() {
    clearTimeout(timer);
    NModbus.Static.Connect.IsConnect = false;
    $(".modbusdatalist").empty();
    $(".btnconnect").removeClass("btn-warning").addClass("btn-success").html("Connect");
};


$('#stop').click(stop);


/** Custom Button Events*/
$(".btnconnect").click(function () {
    NModbus.Static.Connect.ipaddress = $(".txtipaddress").val();
    NModbus.Static.Connect.slave = $(".txtslaveid").val();
    NModbus.Static.Connect.number = $(".txtnumber").val();
    NModbus.Static.Connect.offset = $(".txtoffset").val();
    NModbus.Static.Connect.port = $(".txtport").val();

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
        Utility.WriteHoldingRegisters();
    }
})
/** Custom Button Events END*/


/** Utility */
var Utility = (function () {

    return {
        ReadHoldingRegisters: function () {
            $.ajax({
                url: ApiUrlParse("ReadHoldingRegisters"),//2?number=1&slave=1&ipaddress=127.0.0.1&port=502
                type: 'GET',
                dataType: 'json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    $(".modbusconnectstate").html("");
                    $(".modbusdatalist").empty();
                    NModbus.Static.Connect.IsConnect = true;
                    $.each(data.values, function (index, item) {
                        $(".modbusdatalist").append('<tr><td><span class="tab">' + index + '</span></td><td></td><td>' + item + '</td></tr>');
                    });

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
                    console.log(xhr.status);
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
                url: ApiUrlParse("WriteHoldingRegisters"),
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    var slctparameters = $(".slctparameter");
                    slctparameters.empty();
                    console.log(data);
                    //$.each(data, function (i, item) {

                    //    slctparameters.append("<option value=" + item.categoryid + ">" + item.categoryname + "</option>");
                    //});
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
        isconnect: false
    },
    UpdateData: {
        newvalue: null,
        offsetpoint: null,
    },
    Url: "https://localhost:44323/api/"
}
    /** Static END */