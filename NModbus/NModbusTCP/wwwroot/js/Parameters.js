
var Parameters = Parameters || {};
/** variables */
var parameterid = null;
var parameterlist = null;
var parameteritemid = null;

/** variables */
$(document).ready(function () {
    Parameters.Utility.ParameterAll();
});

/** Custom Button Events*/
function parametercreate() {
    var ipaddress = $(".newipaddress").val();
    var name = $(".newname").val();
    var port = $(".newport").val();
    var slave = $(".newslave").val();
    var jsonData = {
        "name": name,
        "ipaddress": ipaddress,
        "port": port,
        "slave": slave
    }
    var arrayJsonData = [];
    arrayJsonData.push(jsonData);
    if (name == null || name == '') { alert('Parameter namename field cannot be empty'); return; }
    Parameters.Utility.ParameterCreate(arrayJsonData);
}
function parameteredit(e) {
    var row = $(e).closest("tr");
    var parameterid = $(e).data("id");
    var ipaddress = row.find(".ipaddress").val();
    var name = row.find(".name").val();
    var port = row.find(".port").val();
    var slave = row.find(".slave").val();
    var jsonData = {
        "name": name,
        "ipaddress": ipaddress,
        "port": port,
        "slave": slave
    }
    Parameters.Utility.ParameterEdit(parameterid, jsonData);
}
function parameterdelete(e) {
    var parameterid = $(e).data("id");
    Parameters.Utility.ParameterDelete(parameterid);
}

function parameteritemcreate() {
    var newparameterno = $(".newparameterno").val();
    var newtitle = $(".newtitle").val();
    var newregisterid = $(".newregisterid").val();
    var newregisterquantity = $(".newregisterquantity").val();
    var newdecimalpoint = $(".newdecimalpoint").val();
    var newunit = $(".newunit").val();
    var newpermission = $(".newpermission").val();
    var newdescription = $(".newdescription").val();
    var jsonData = {
        "parameterid": parameterid,
        "parameterno": newparameterno,
        "title": newtitle,
        "registerid": newregisterid,
        "registerquantity": newregisterquantity,
        "decimalpoint": newdecimalpoint,
        "unit": newunit,
        "permission": newpermission,
        "description": newdescription
    }
    var arrayJsonData = [];
    arrayJsonData.push(jsonData);
    if (newtitle == null || newtitle == '') { alert('Parameter title field cannot be empty'); return; }
    Parameters.Utility.ParameterItemCreate(arrayJsonData);
}
function parameteritemedit(e) {
    var row = $(e).closest("tr");
    parameteritemid = $(e).data("id");
    var parameterid = $(e).data("parameterid");
    var newparameterno = row.find(".parameterno").val();
    var newtitle = row.find(".title").val();
    var newregisterid = row.find(".registerid").val();
    var newregisterquantity = row.find(".registerquantity").val();
    var newdecimalpoint = row.find(".decimalpoint").val();
    var newunit = row.find(".unit").val();
    var newpermission = row.find(".permission").val();
    var newdescription = row.find(".description").val();
    var jsonData = {
        "parameterid": parameterid,
        "parameterno": newparameterno,
        "title": newtitle,
        "registerid": newregisterid,
        "registerquantity": newregisterquantity,
        "decimalpoint": newdecimalpoint,
        "unit": newunit,
        "permission": newpermission,
        "description": newdescription
    }
    Parameters.Utility.ParameterItemEdit(parameterid, jsonData);
}
function parameteritemdelete(e) {
    parameteritemid = $(e).data("id");
    var parameterid = $(e).data("parameterid");
    Parameters.Utility.ParameterItemDelete(parameterid);
}

/** Custom Button Events END*/


/** Utility */
Parameters.Utility = (function () {
    var ParameterAll = function () {
        $.ajax({
            url: ApiUrlParse("Parameters"),
            type: 'GET',
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            data: '{}',
            success: function (data, textStatus, xhr) {
                var slctparameters = $(".parameters");
                slctparameters.empty();
                $.each(data, function (index, item) {
                    slctparameters.append('<div class="card">' +
                        '<h5 class="card-header"><b>Ip:' + item.ipaddress + ' Port:' + item.port + '</b></h5>' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + item.name + '</h5>' +
                        '<p class="card-text">Slave:' + item.slave + '</p>' +
                        '<div class="col-md-1">' +
                        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".parameterModal" onClick="Parameters.Utility.ParameterView(this)" data-id="' + item.id + '">Detail</button>' +
                        '</div > ' +
                        '<div class="col-md-1">' +
                        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".parameterModal" onClick="Parameters.Utility.ParameterItemView(this)" data-id="' + item.id + '">Parameter Items</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<br/><hr/>'
                    );
                });
                parameterlist = data;
                return parameterlist;
            },
            complete: function (xhr, textStatus) {
            },
            Error: function (data) {
                $(".modbusconnectstate").html("Error");
            }
        });
    }
    var ParameterView = function (e) {
        if ($(e).data("id") == null) {
            parameterid = e;
        } else {
            parameterid = $(e).data("id");
        }

        var html = '';
        var row = '';
        $(".parametermodalbody").empty();
        $.each(parameterlist.filter(record => record.id == parameterid), function (index, item) {
            row += '<tr>' +
                '<td><input type="text" class="form-control ipaddress" value="' + item.ipaddress + '"></input></td>' +
                '<td><input type="text" class="form-control name" value="' + item.name + '"></input></td>' +
                '<td><input type="text" class="form-control port" value="' + item.port + '"></input></td>' +
                '<td><input type="text" class="form-control slave" value="' + item.slave + '"></input></td>' +
                '<td><div class="col"><input type="button" class="form-control btn btn-primary" onClick="parameteredit(this)" data-id="' + item.id + '" value="Edit"></input></div></td>' +
                '<td><div class="col"><input type="button" class="form-control btn btn-warning" onClick="parameterdelete(this)" data-id="' + item.id + '" value=" Item Delete"></input></div></td>' +
                '</tr>'
                ;
        })
        html = '<br/><table class="table"><thead>' +
            '<tr>' +
            '<th>IP Address</th>' +
            '<th>Name</th>' +
            '<th>Port</th>' +
            '<th>Slave</th>' +
            '</tr>' +
            '</thead>' + row + '</table>'
        $(".parametermodalbody").append(html);
    }
    var ParameterEdit = function (parameterid, ParameterRequestData) {
        $.ajax({
            url: ApiUrlParse("ParameterEdit"),
            async: false,
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(ParameterRequestData),
            success: function (data, textStatus, xhr) {
                ParameterAll();
                ParameterView(parameterid);
                $(".isstate").html("Edit Success!");
                $(".isstate").css("color", "green");
                $(".isstate").show();
                setTimeout(function () {
                    $(".isstate").hide();
                }, 2000);

            },
            complete: function (xhr, textStatus) {

            },
            Error: function (data) {
                $(".modbusconnectstate").html("Error");
            }
        })
    }
    var ParameterDelete = function (parameterid) {
        $.ajax({
            url: ApiUrlParse("ParameterDelete"),
            type: 'DELETE',
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            data: '',
            success: function (data, textStatus, xhr) {
                ParameterAll();
                ParameterView(parameterid);
                $(".parameterModal .close").click();
                $(".isstate").html("Delete Success!");
                $(".isstate").css("color", "green");
                $(".isstate").show();
                setTimeout(function () {
                    $(".isstate").hide();
                }, 2000);

            },
            complete: function (xhr, textStatus) {

            },
            Error: function (data) {
                $(".modbusconnectstate").html("Error");
            }
        })
    }
    var ParameterCreate = function (ParameterRequestData) {
        $.ajax({
            url: ApiUrlParse("ParameterCreate"),
            type: 'POST',
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(ParameterRequestData),
            success: function (data, textStatus, xhr) {
                ParameterAll();
            },
            complete: function (xhr, textStatus) {

            },
            Error: function (data) {
                alert(data.message);
            }
        })
    }
    var ParameterItemView = function (e) {
        if ($(e).data("id") == null) {
            parameterid = e;
        } else {
            parameterid = $(e).data("id");
        }
        $.ajax({
            url: ApiUrlParse("ParameterItems"),
            type: 'GET',
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            data: '{}',
            success: function (data, textStatus, xhr) {
                var html = '';
                var row = '';
                $(".parametermodalbody").empty();
                var htmlItemCreate = '<div class="row">' +
                    '    <div class="col-md-12">' +
                    '        <table class="table newparameter">' +
                    '            <thead>' +
                    '                <tr>' +
                    '                    <th>Param.No.</th>' +
                    '                    <th>Title</th>' +
                    '                    <th>Register Id(Offset)</th>' +
                    '                    <th>Quantity</th>' +
                    '                    <th>Decimal Point</th>' +
                    '                    <th>Unit</th>' +
                    '                    <th>Permission</th>' +
                    '                    <th>Description</th>' +
                    '                </tr>' +
                    '            </thead>' +
                    '            <tbody>' +
                    '                <tr>' +
                    '                    <td><input type="text" class="form-control newparameterno" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newtitle" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newregisterid" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newregisterquantity" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newdecimalpoint" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newunit" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newpermission" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newdescription" value="" /></td>' +
                    '                    <td><input type="button" class="btn btn-success" onclick="parameteritemcreate(this)" value="Add Item" /></td>' +
                    '                </tr>' +
                    '            </tbody>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>' +
                    '<br />';
                $(".parametermodalbody").append(htmlItemCreate);
                $.each(data.filter(record => record.parameterid == parameterid), function (index, item) {
                    row += '<tr>' +
                        '<td><input type="text" class="form-control parameterno" value="' + item.parameterno + '"></input></td>' +
                        '<td><input type="text" class="form-control title" value="' + item.title + '"></input></td>' +
                        '<td><input type="text" class="form-control registerid" value="' + item.registerid + '"></input></td>' +
                        '<td><input type="text" class="form-control registerquantity" value="' + item.registerquantity + '"></input></td>' +
                        '<td><input type="text" class="form-control decimalpoint" value="' + item.decimalpoint + '"></input></td>' +
                        '<td><input type="text" class="form-control unit" value="' + item.unit + '"></input></td>' +
                        '<td><input type="text" class="form-control permission" value="' + item.permission + '"></input></td>' +
                        '<td><input type="text" class="form-control description" value="' + item.description + '"></input></td>' +
                        '<td><div class="col"><input type="button" class="form-control btn btn-primary" onClick="parameteritemedit(this)" data-id="' + item.id + '" data-parameterid="' + item.parameterid + '" value="Edit"></input></div></td>' +
                        '<td><div class="col"><input type="button" class="form-control btn btn-warning" onClick="parameteritemdelete(this)" data-id="' + item.id + '" data-parameterid="' + item.parameterid + '" value=" Item Delete"></input></div></td>' +
                        '</tr>'
                        ;
                })
                html = '<br/><div class="row"><table class="table"><thead>' +
                    '                <tr>' +
                    '                    <th>Param.No.</th>' +
                    '                    <th>Title</th>' +
                    '                    <th>Register Id(Offset)</th>' +
                    '                    <th>Quantity</th>' +
                    '                    <th>Decimal Point</th>' +
                    '                    <th>Unit</th>' +
                    '                    <th>Permission</th>' +
                    '                    <th>Description</th>' +
                    '                </tr>' +
                    '</thead>' + row + '</table></div>'
                $(".parametermodalbody").append(html);
            },
            complete: function (xhr, textStatus) {
            },
            Error: function (data) {
            }
        });
    }
    var ParameterItemEdit = function (parameterid, ParameterItemRequestData) {
        $.ajax({
            url: ApiUrlParse("ParameterItemEdit"),
            type: 'PUT',
            dataType: 'json',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(ParameterItemRequestData),
            success: function (data, textStatus, xhr) {
                ParameterAll();
                ParameterItemView(parameterid);
                $(".isstate").html("Edit Success!");
                $(".isstate").css("color", "green");
                $(".isstate").show();
                setTimeout(function () {
                    $(".isstate").hide();
                }, 2000);

            },
            complete: function (xhr, textStatus) {

            },
            Error: function (data) {
                $(".modbusconnectstate").html("Error");
            }
        })
    }
    var ParameterItemDelete = function (parameterid) {
        $.ajax({
            url: ApiUrlParse("ParameterItemDelete"),
            type: 'DELETE',
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            data: '',
            success: function (data, textStatus, xhr) {
                ParameterAll();
                ParameterItemView(parameterid);
                $(".isstate").html("Delete Success!");
                $(".isstate").css("color", "green");
                $(".isstate").show();
                setTimeout(function () {
                    $(".isstate").hide();
                }, 2000);

            },
            complete: function (xhr, textStatus) {

            },
            Error: function (data) {
                $(".modbusconnectstate").html("Error");
            }
        })
    }
    var ParameterItemCreate = function (ParameterItemRequestData) {
        $.ajax({
            url: ApiUrlParse("ParameterItemCreate"),
            type: 'POST',
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(ParameterItemRequestData),
            success: function (data, textStatus, xhr) {
                ParameterAll();
                ParameterItemView(parameterid);
            },
            complete: function (xhr, textStatus) {

            },
            Error: function (data) {
                alert(data.message);
            }
        })
    }
    return {
        ParameterAll,
        ParameterView,
        ParameterEdit,
        ParameterDelete,
        ParameterCreate,
        ParameterItemView,
        ParameterItemEdit,
        ParameterItemDelete,
        ParameterItemCreate
    }
})();
function ApiUrlParse(endpointparameter) {

    switch (endpointparameter) {
        case "Parameters":
            return window.location.protocol + "//" + window.location.host + '/api/Parameters';
            break;
        case "ParameterEdit":
            return window.location.protocol + "//" + window.location.host + '/api/Parameters/' + parameterid;
            break;
        case "ParameterDelete":
            return window.location.protocol + "//" + window.location.host + '/api/Parameters/' + parameterid;
            break;
        case "ParameterCreate":
            return window.location.protocol + "//" + window.location.host + '/api/Parameters';
            break;
        case "ParameterItems":
            return window.location.protocol + "//" + window.location.host + '/api/ParameterItems';
            break;
        case "ParameterItemEdit":
            return window.location.protocol + "//" + window.location.host + '/api/ParameterItems/' + parameteritemid;
            break;
        case "ParameterItemDelete":
            return window.location.protocol + "//" + window.location.host + '/api/ParameterItems/' + parameteritemid;
            break;
        case "ParameterItemCreate":
            return window.location.protocol + "//" + window.location.host + '/api/ParameterItems';
            break;
    }

}
/**Utility END */

/** Static*/
Parameters.Static = Parameters.Static || {};

Parameters.Static = {

}
    /** Static END */