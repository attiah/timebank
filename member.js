

function test() 
{
    try {

        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        if (id == "") {
            alert("please input User ID ");
            return false;
        }

        if (name == "") {
            alert("please input User name ");
            return false;
        }
        if (email == "") {
            alert("please input User email ");
            return false;
        }

        if (phone == "") {
            message("please input User phone ");
            return false;
        }
        if (pasword == "") {
            alert("please input User password ");
            return false;
        }

        if (phone.length != 10) {
            alert("Please input phone number in 10 numbers");
            return false;
        }
        if (phone.substring(0, 2) != "05") {
            alert("input phone incorrect format and start with 05");
            return false;
        }
        var exp = /^[0-9|]+$/;

        if (!exp.test(phone)) {
            alert("the phone must in number only ");
            return false;
        }

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            alert("input Email incorrect format ");
            return false;
        }
        
        return true;
    }
    catch (e) { toast(e); }

}
//---------------- clear
function clear() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function add() {
    if (test()) send('new');
}
function save() {
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
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/member.ashx",
            data: { mode: mode, id: id, name: name, cid: cid ,phone:phone,email:email,password:password},
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('<li>').append('<a href="javascript:list(\'' + obj.rows[i].MemberCode + '\',\'' + obj.rows[i].FullName + '\',\'' + obj.rows[i].phone + '\',\'' + obj.rows[i].email + '\',\'' + obj.rows[i].password + '\')" class="ui-btn ui-btn-icon-left  ui-icon-minus"> ' + obj.rows[i].FullName + '</a> ').appendTo('#alldata');
                }
                $('#alldata').listview().listview('refresh');


            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}
//========================================

function list(id, name,phone,email,password) {
    document.getElementById("id").value = id;
    document.getElementById("cid").value = id;
    document.getElementById("name").value = name;
    document.getElementById("phone").value = phone;
    document.getElementById("email").value = email;
    document.getElementById("password").value = password;

}