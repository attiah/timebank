
var id = "";
var name = "";
var note = "";

function geturl() {
    try {
        var sURL = window.document.URL.toString();
        if (sURL.indexOf("?") > 0) {
            var arrParams = sURL.split("?");

            var arrURLParams = arrParams[1].split("&");

            var arrParamNames = new Array(arrURLParams.length);
            var arrParamValues = new Array(arrURLParams.length);

            var i = 0;
            for (i = 0; i < arrURLParams.length; i++) {
                var sParam = arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] != "")
                    arrParamValues[i] = unescape(sParam[1]);
                else
                    arrParamValues[i] = "No Value";
            }
            id = arrParamValues[0];
            name = arrParamValues[1];
            note = arrParamValues[2];
        }
    }
    catch (e) { }
}



function send(mode) {
    try {

        geturl();
        document.getElementById("id").value = id;
        document.getElementById("name").value = name;
        document.getElementById("note").value = note;


        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/postmember.ashx",
            data: { id: id },
            success: function (text) {
                
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('<li >').append('<a href="#" class="ui-btn ui-btn-icon-left  ui-icon-minus">'+obj.rows[i].FullName+'</a> ').appendTo('#alldata');
                }
                $('#alldata').listview().listview('refresh');


            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}
//========================================

function list(id, name,note,no,date) {
    document.getElementById("id").value = id;
    document.getElementById("cid").value = id;
    document.getElementById("name").value = name;
    document.getElementById("note").value = note;
    document.getElementById("no").value = no;
    document.getElementById("date").value = date.substring(0, 10);
}