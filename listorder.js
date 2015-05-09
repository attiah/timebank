

function test() 
{
    try {

        var name = document.getElementById("name").value;
        var replay = document.getElementById("replay").value;
        if (name == "") {
            alert("please select  order ");
            return false;
        }
        if (replay == "") {
            alert("please input comment ");
            return false;
        }
        return true;
    }
    catch (e) { alert(e); }

}

function comment() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var note = document.getElementById("note").value;
    if (id == "") {
        alert("please select record");
        return;
    }
    window.location = "orderallcomm.html?id=" + id + " &name=" + name + " & note=" + note; 
}
function add() {
    if (test()) send('new');
}

function send(mode) {
    try {

        var cid = document.getElementById("cid").value;
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var note = document.getElementById("note").value;
        var replay = document.getElementById("replay").value;
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/listorder.ashx",
            data: { mode: mode, id: id, name: replay, cid: cid, note: note, replay: replay },
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('<li >').append('<a href="javascript:list(\'' + obj.rows[i].OrderID + '\',\'' + obj.rows[i].Title + '\',\'' + obj.rows[i].Note + '\')" class="ui-btn ui-btn-icon-left  ui-icon-minus"><h2> ' + obj.rows[i].Title + '</h2><h2>' + obj.rows[i].Note + '</h2><h2>' + obj.rows[i].FullName + '</h2><h2>' + obj.rows[i].phone + '</h2></a> ').appendTo('#alldata');
                }
                $('#alldata').listview().listview('refresh');


            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}
//========================================

function list(id, name,note) {
    document.getElementById("id").value = id;
    document.getElementById("cid").value = id;
    document.getElementById("name").value = name;
    document.getElementById("note").value = note;
}