

function test() 
{
    try {

        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        if (id == "") {
            alert("please input Member ID ");
            return false;
        }

        if (name == "") {
            alert("please input Member name ");
            return false;
        }
        if (email == "") {
            alert("please input Member email ");
            return false;
        }

        if (phone == "") {
            message("please input Member phone ");
            return false;
        }
        if (pasword == "") {
            alert("please input Member password ");
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

function save() {
     if (test()) send('update');
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
            url: "http://www.tnaskills.com/execute/profile.ashx",
            data: { mode: mode, id: id, name: name, cid: cid ,phone:phone,email:email,password:password},
            success: function (text) {
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    document.getElementById("id").value = obj.rows[i].MemberCode;
                    document.getElementById("name").value = obj.rows[i].FullName;
                    document.getElementById("phone").value = obj.rows[i].phone;
                    document.getElementById("email").value = obj.rows[i].email;
                    document.getElementById("password").value = obj.rows[i].password;
                }
               


            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}

