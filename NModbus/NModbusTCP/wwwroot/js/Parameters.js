
var Parameters = Parameters || {};
$(document).ready(function () {
    Utility.Parameters();

});

/** Custom Button Events*/

/** Custom Button Events END*/


/** Utility */
var Utility = (function () {

    return {
        Parameters: function () {
            $.ajax({
                url: ApiUrlParse("Parameters"),
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    var slctparameters = $(".parameters");
                    slctparameters.empty();
                    console.log(data);
                    Parameters.Static.parameterlist = data;
                    $.each(data, function (index, item) {
                        $(".parameters").append('<div class="card">' +
                            '<h5 class="card-header"><b>Ip:' + item.ipaddress + ' Port:' + item.port + '</b></h5>' +
                            '<div class="card-body">' +
                            '<h5 class="card-title">' + item.name + '</h5>' +
                            '<p class="card-text">Slave:' + item.slave + ' Offset:' + item.offset + ' Number:' + item.number + '</p>' +
                            /*'<a href="#" class="btn btn-primary" onClick="Utility.ParameterEdit(this)" data-id="' + item.id + '">Edit</a>' +*/
                            '<button type="button" class="btn btn-primary" data-toggle="modal" onClick="Utility.ParameterEdit(this)" data-target="#parameterModal" data-id="' + item.id + '">Detail</button>' +
                            '<button type="button" class="btn btn-primary" data-toggle="modal" onClick="Utility.ParameterItemEdit(this)" data-target="#parameterModal" data-id="' + item.id + '">View Items</button>' +
                            '</div>' +
                            '</div>' +
                            '<hr style="width:40%;margin-right:100%;" />'
                        );
                    });
                },
                complete: function (xhr, textStatus) {
                },
                Error: function (data) {
                    $(".modbusconnectstate").html("Error");
                }
            });
        },
        ParameterEdit: function (e) {
            Parameters.Static.parameterid = $(e).data("id");

            var html = '';
            var row = '';
            $(".parametermodalbody").empty();
            $.each(Parameters.Static.parameterlist.filter(record => record.id == Parameters.Static.parameterid), function (index, item) {
                var keys = Object.keys(item);

                $.each(keys, function (keyindex, keyitem) {
                    if (keyitem != "parameterItems" && keyitem != "id") {
                        row += '<tr>' +
                            '<td>' + keyitem + '</td>' +
                            '<td><input type="text" class="form-control" value="' + item[keyitem] + '"></input></td>' +
                            '</tr>'
                            ;
                    } else if (keyitem == "id") {
                        row += '<tr>' +
                            '<td>' + keyitem + '</td>' +
                            '<td><input type="text" disabled class="form-control" value="' + item[keyitem] + '"></input></td>' +
                            '</tr>'
                            ;
                    }
                })

            })
            html = '<table>' + row + '</table>'
            $(".parametermodalbody").append(html);
        },
        ParameterItemEdit: function (e) {
            $.ajax({
                url: ApiUrlParse("ParameterItems"),
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: '{}',
                success: function (data, textStatus, xhr) {
                    //Parameters.Static.Parameteritemlist = data.filter(record => record.parameterid == $(e).data("id"));
                    //alert(Parameters.Static.Parameteritemlist);
                    var html = '';
                    var row = '';
                    $(".parametermodalbody").empty();
                    $.each(data.filter(record => record.parameterid == $(e).data("id")), function (index, item) {
                        var keys = Object.keys(item);

                        $.each(keys, function (keyindex, keyitem) {
                            if (keyitem != "id") {
                                row += '<tr>' +
                                    '<td>' + keyitem + '</td>' +
                                    '<td><input type="text" class="form-control" value="' + item[keyitem] + '"></input></td>' +
                                    '</tr>'
                                    ;
                            } else if (keyitem == "id") {
                                row += '<tr><td>dasdasdasd</td><td></td></tr><tr>' +
                                    '<td>' + keyitem + '</td>' +
                                    '<td><input type="text" disabled class="form-control" value="' + item[keyitem] + '"></input></td>' +
                                    '</tr>'
                                    ;
                            }
                        })

                    })
                    html = '<br/><table>' + row + '</table>'
                    $(".parametermodalbody").append(html);
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
        case "Parameters":
            return window.location.protocol + "//" + window.location.host + '/api/Parameters';
            break;
        case "ParameterItems":
            return window.location.protocol + "//" + window.location.host + '/api/ParameterItems';
            break;
    }

}
/**Utility END */

/** Static*/
Parameters.Static = Parameters.Static || {};

Parameters.Static = {
    parameterid: null,
    parameterlist: null,
    Parameteritemlist: null
}
    /** Static END */