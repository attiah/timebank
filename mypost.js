

function reservation() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var note = document.getElementById("note").value;
    if (id == "") {
        alert("please select record");
        return;
    }
    window.location = "postmember.html?id=" + id + " &name=" + name + " & note=" + note;
}
function comment() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value ;
    var note = document.getElementById("note").value ;
    if (id == "") {
        alert("please select record");
        return;
    }
    window.location = "postcomment.html?id=" + id+" &name="+name+" & note="+note; 
}
function test() 
{
    try {

        var name = document.getElementById("name").value;
        var note = document.getElementById("note").value;
        var name = document.getElementById("name").value;
        var cat = document.getElementById("cmbi").value;
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;
        var no = document.getElementById("no").value;
        if (name == "") {
            alert("please input Title ");
            return false;
        }
        if (note == "") {
            alert("please input Description ");
            return false;
        }
        if (date == "") {
            alert("please input date ");
            return false;
        }
        if (time == "") {
            alert("please input time ");
            return false;
        }
        if (cat == "0") {
            alert("please input Category ");
            return false;
        }
        if (no == "") {
            alert("please input Member Number  ");
            return false;
        }
        var exp = /^[0-9|:]+$/;

        if (!exp.test(time)) {
            alert("the time must in number only ");
            return false;
        }
        var expno = /^[0-9|]+$/;

        if (!expno.test(no)) {
            alert("the Member nUmber must in number only ");
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
    document.getElementById("no").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
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
        var cat = document.getElementById("cmbi").value;
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;
        var no = document.getElementById("no").value;
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/mypost.ashx",
            data: { mode: mode, id: id, name: name,no:no, cid: cid,note:note,cat:cat,time:time,date:date },
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('<li>').append('<a href="javascript:list(\'' + obj.rows[i].postID + '\',\'' + obj.rows[i].title + '\',\'' + obj.rows[i].description + '\',\'' + obj.rows[i].CatID + '\',\'' + obj.rows[i].postDate + '\',\'' + obj.rows[i].time + '\',\'' + obj.rows[i].MemberNumber + '\')" class="ui-btn ui-btn-icon-left data-icon-minus"> ' + obj.rows[i].title + '</a> ').appendTo('#alldata');
                }
                $('#alldata').listview().listview('refresh');


            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}
//========================================

function list(id, name,note,cat,date,time,no) {
    document.getElementById("id").value = id
    document.getElementById("cid").value = id;
    document.getElementById("name").value = name;
    document.getElementById("note").value = note;
    document.getElementById("cmbi").value = cat;
    document.getElementById("date").value = date.substring(0, 10); 
    document.getElementById("time").value = time;
    document.getElementById("no").value = no;
}
function map() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var note = document.getElementById("note").value;
    if (id == "") {
        alert("please select record");
        return;
    }
    window.location = "map.html?id=" + id + " &name=" + name + " & note=" + note;
}
/// ----------------
function loadcat() {

    try {
       


        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/allcat.ashx",
            data: {},
            success: function (text) {
                
                var obj = JSON.parse(text);

                $('#cmbi').empty();
                $('#cmbi').append('<option value="0">Select Category</option>');
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('#cmbi').append('<option value="' + obj.rows[i].CatID + '">' + obj.rows[i].CatName + '</option>');
                }
                $("#cmbi").selectmenu('refresh', true);

            },
            error: function (text) { toast(text); }
        });

        send('list');
    }
    catch (e) { toast(e); }
}


