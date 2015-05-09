

function test() 
{
    try {
        
        var name = document.getElementById("name").value;
        if (name == "") {
            alert("please input category ");
            return false;
        }
        return true;
    }
    catch (e) { toast(e); }

}
//---------------- clear
function clear() {
    document.getElementById("id").value = "";
    document.getElementById("name").value="";
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
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/cat.ashx",
            data: { mode: mode, id: id, name: name, cid: cid },
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('<li data-icon="minus">').append('<a href="javascript:list(\'' + obj.rows[i].CatID + '\',\'' + obj.rows[i].CatName + '\')" class="ui-btn ui-btn-icon-left "> ' + obj.rows[i].CatName + '</a> ').appendTo('#alldata');
                }
                $('#alldata').listview().listview('refresh');


            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}
//========================================

function list(id, name) {
    document.getElementById("id").value = id;
    document.getElementById("cid").value = id;
    document.getElementById("name").value = name;
}