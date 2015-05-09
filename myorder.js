
function comment() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value ;
    var note = document.getElementById("note").value ;
    if (id == "") {
        alert("please select record");
        return;
    }
    window.location = "ordercomment.html?id=" + id+" &name="+name+" & note="+note; 
}
function test() 
{
    try {

        var name = document.getElementById("name").value;
        var note = document.getElementById("note").value;
        if (name == "") {
            alert("please input Title ");
            return false;
        }
        if (note == "") {
            alert("please input Description ");
            return false;
        }
        return true;
    }
    catch (e) { alert(e); }

}
//---------------- clear
function clear() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("note").value = "";
}

function add() {
    if (test()) send('new');
}
function save() {
    if (document.getElementById("id").value == "") {
        alert("please select record");
        return;
    }
    if (test()) send('update');
}

function Delete() {
    var answer = confirm('are you sure ?');
    if (answer) {
        send('delete');
    }
}

function send(mode) {
    try {

        var cid = document.getElementById("cid").value;
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var note = document.getElementById("note").value;
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/myorder.ashx",
            data: { mode: mode, id: id, name: name, cid: cid,note:note },
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('<li>').append('<a href="javascript:list(\'' + obj.rows[i].OrderID + '\',\'' + obj.rows[i].Title + '\',\'' + obj.rows[i].Note + '\')" class="ui-btn ui-btn-icon-left data-icon-minus"> ' + obj.rows[i].Title + '</a> ').appendTo('#alldata');
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