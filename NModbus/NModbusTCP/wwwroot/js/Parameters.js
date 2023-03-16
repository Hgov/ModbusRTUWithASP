
var Parameters = Parameters || {};
/** variables */
var parameterid = null;
var parameterlist = null;
var parameteritemid = null;

/** variables */
$(document).ready(function () {
    Parameters.Utility.FetchParameter();
});

/** Custom Button Events*/
function parametercreate() {
    var ipaddress = $(".newipaddress").val();
    var name = $(".newname").val();
    var number = $(".newnumber").val();
    var offset = $(".newoffset").val();
    var port = $(".newport").val();
    var slave = $(".newslave").val();
    var jsonData = {
        "name": name,
        "ipaddress": ipaddress,
        "number": number,
        "offset": offset,
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
    var number = row.find(".number").val();
    var offset = row.find(".offset").val();
    var port = row.find(".port").val();
    var slave = row.find(".slave").val();
    var jsonData = {
        "name": name,
        "ipaddress": ipaddress,
        "number": number,
        "offset": offset,
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
    var parameterno = $(".newparameterno").val();
    var text = $(".newtext").val();
    var value = $(".newvalue").val();
    var valueformat = $(".newvalueformat").val();
    var ordernumber = $(".newordernumber").val();
    var permission = $(".newpermission").val();
    var description = $(".newdescription").val();
    var jsonData = {
        "parameterid": parameterid,
        "parameterno": parameterno,
        "text": text,
        "value": value,
        "valueformat": valueformat,
        "ordernumber": ordernumber,
        "permission": permission,
        "description": description
    }
    var arrayJsonData = [];
    arrayJsonData.push(jsonData);
    if (text == null || text == '') { alert('Parameter text field cannot be empty'); return; }
    Parameters.Utility.ParameterItemCreate(arrayJsonData);
}
function parameteritemedit(e) {
    var row = $(e).closest("tr");
    parameteritemid = $(e).data("id");
    var parameterid = $(e).data("parameterid");
    var parameterno = row.find(".parameterno").val();
    var text = row.find(".text").val();
    var value = row.find(".value").val();
    var valueformat = row.find(".valueformat").val();
    var ordernumber = row.find(".ordernumber").val();
    var permission = row.find(".permission").val();
    var description = row.find(".description").val();
    var jsonData = {
        "parameterid": parameterid,
        "parameterno": parameterno,
        "text": text,
        "value": value,
        "valueformat": valueformat,
        "ordernumber": ordernumber,
        "permission": permission,
        "description": description
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
    var FetchParameter = function () {
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
                        '<p class="card-text">Slave:' + item.slave + ' Offset:' + item.offset + ' Number:' + item.number + '</p>' +
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
                '<td><input type="text" class="form-control number" value="' + item.number + '"></input></td>' +
                '<td><input type="text" class="form-control offset" value="' + item.offset + '"></input></td>' +
                '<td><input type="text" class="form-control port" value="' + item.port + '"></input></td>' +
                '<td><input type="text" class="form-control slave" value="' + item.slave + '"></input></td>' +
                '<td><div class="col"><input type="button" class="form-control btn btn-primary" onClick="parameteredit(this)" data-id="' + item.id + '" value="Edit"></input></div></td>' +
                '<td><div class="col"><input type="button" class="form-control btn btn-warning" onClick="parameterdelete(this)" data-id="' + item.id + '" value=" Item Delete"></input></div></td>' +
                '</tr>'
                ;
        })
        html = '<br/><table class="table"><thead>' +
            '<tr>' +
            '<th>ipaddress</th>' +
            '<th>name</th>' +
            '<th>number</th>' +
            '<th>offset</th>' +
            '<th>port</th>' +
            '<th>slave</th>' +
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
                FetchParameter();
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
                FetchParameter();
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
                FetchParameter();
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
                    '                    <th>parameterno</th>' +
                    '                    <th>text</th>' +
                    '                    <th>value</th>' +
                    '                    <th>valueformat</th>' +
                    '                    <th>ordernumber</th>' +
                    '                    <th>permission</th>' +
                    '                    <th>description</th>' +
                    '                </tr>' +
                    '            </thead>' +
                    '            <tbody>' +
                    '                <tr>' +
                    '                    <td><input type="text" class="form-control newparameterno" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newtext" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newvalue" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newvalueformat" value="" /></td>' +
                    '                    <td><input type="text" class="form-control newordernumber" value="" /></td>' +
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
                        '<td><input type="text" class="form-control text" value="' + item.text + '"></input></td>' +
                        '<td><input type="text" class="form-control value" value="' + item.value + '"></input></td>' +
                        '<td><input type="text" class="form-control valueformat" value="' + item.valueformat + '"></input></td>' +
                        '<td><input type="text" class="form-control ordernumber" value="' + item.ordernumber + '"></input></td>' +
                        '<td><input type="text" class="form-control permission" value="' + item.permission + '"></input></td>' +
                        '<td><input type="text" class="form-control description" value="' + item.description + '"></input></td>' +
                        '<td><div class="col"><input type="button" class="form-control btn btn-primary" onClick="parameteritemedit(this)" data-id="' + item.id + '" data-parameterid="' + item.parameterid + '" value="Edit"></input></div></td>' +
                        '<td><div class="col"><input type="button" class="form-control btn btn-warning" onClick="parameteritemdelete(this)" data-id="' + item.id + '" data-parameterid="' + item.parameterid + '" value=" Item Delete"></input></div></td>' +
                        '</tr>'
                        ;
                })
                html = '<br/><div class="row"><table class="table"><thead>' +
                    '<tr>' +
                    '<th>parameterno</th>' +
                    '<th>text</th>' +
                    '<th>value</th>' +
                    '<th>valueformat</th>' +
                    '<th>ordernumber</th>' +
                    '<th>permission</th>' +
                    '<th>description</th>' +
                    '</tr>' +
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
                FetchParameter();
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
                FetchParameter();
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
                FetchParameter();
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
        FetchParameter,
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