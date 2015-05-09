

function test() 
{
    try {

        var name = document.getElementById("name").value;
        var replay = document.getElementById("replay").value;
        if (name == "") {
            alert("please select  Post ");
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
    var name = document.getElementById("replay").value;
    var note = document.getElementById("note").value;
    if (id == "") {
        alert("please select record");
        return;
    }
    window.location = "postallcomm.html?id=" + id + " &name=" + name + " & note=" + note; 
}
function add() {
    if (test()) send('new');
}
function reservation() {
    var name = document.getElementById("name").value;
    if (name == "") {
        alert("please select  Post ");
        return false;
    }
    var date = document.getElementById("date").value;
    var no =parseInt(document.getElementById("no").value);
    if (no <= 0) {
        alert("Can not reservation not found location ");
        return;
    }
    
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var cdate = mm + '/' + dd + '/' + yyyy;
    if (cdate > date) {
        alert("Can not reservation The date is old");
        return;
    }
    send('reversation');
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
            url: "http://www.tnaskills.com/execute/listpost.ashx",
            data: { mode: mode, id: id, name: replay, cid: cid, note: note, replay: replay },
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('<li >').append('<a href="javascript:list(\'' + obj.rows[i].postID + '\',\'' + obj.rows[i].title + '\',\'' + obj.rows[i].description + '\',\'' + obj.rows[i].no + '\',\'' + obj.rows[i].postDate + '\')" class="ui-btn ui-btn-icon-left  ui-icon-minus"><h2> ' + obj.rows[i].title + '</h2><h2>' + obj.rows[i].description + '</h2><h2>' + obj.rows[i].FullName + '</h2><h2>' + obj.rows[i].phone + '</h2></a> ').appendTo('#alldata');
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