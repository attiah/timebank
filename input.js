$(function () {
    MenuData1();
    $("#menu1").enhanceWithin().popup();
    
});
//----------------------------------
var alert = function (msg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'  data-theme='a'><h3>" + msg + "</h3></div>")
.css({ display: "block",
    opacity: 0.90,
    position: "fixed",
    padding: "7px",
    color: "#666666",
    "background-color": "#FFFFFF",
    "text-align": "center",
    width: "270px",
    left: ($(window).width() - 284) / 2,
    top: $(window).height() / 2
})
.appendTo($.mobile.pageContainer).delay(1500)
.fadeOut(500, function () {
    $(this).remove();
});
}



//===========================================

function MenuData1() {
    $('#mymenu').empty();
    $('<li>').append('<a href="javascript:home()" class="ui-btn ui-btn-icon-left ui-icon-home"  >Home</a>').appendTo('#mymenu');
    $('<li>').append('<a href="javascript:category()"  class="ui-btn ui-btn-icon-left ui-icon-user"  > Category </a> ').appendTo('#mymenu');
    $('<li>').append('<a href="javascript:member()"  class="ui-btn ui-btn-icon-left ui-icon-phone"  >User</a>  ').appendTo('#mymenu');
    $('<li>').append('<a href="javascript:user()"  class="ui-btn ui-btn-icon-left ui-icon-phone"  >Admin</a>  ').appendTo('#mymenu');
    $('<li>').append('<a href="javascript:logout()"  class="ui-btn ui-btn-icon-left ui-icon-shop"  >Logout</a> ').appendTo('#mymenu');
    $('#mymenu').listview().listview('refresh');
}
function home() {
    window.location = "input.html";
}
function category() {
    window.location = "category.html";
}
function member() {
    window.location = "member.html";
}
function user() {
    window.location = "User.html";
}
function contact() {
    window.location = "contact.html";
}
function logout() {
    window.location = "index.html";
}

//------------ Login user
function loginuser() {
    try {
        var id = document.getElementById("id").value;
        var pasword = document.getElementById("password").value;
        if (id == "") {
            alert("please input User ID ");
            return;
        }
        if (pasword == "") {
            alert("please input Member password ");
            return;
        }

        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/login.ashx",
            data: { id: id, pass: pasword },
            success: function (text) {

                var json = JSON.parse(text);
                alert(json.message);
                var op = json.ch;
                alert(op);
                if (op == "2") {
                    window.location = "input.html";
                }
                else {

                }
            },
            error: function (data) { alert(data); }
        });
    }
    catch (e) { alert(e); }

}


///----- Register 
function rgisterMember() {
    try {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        if (id == "") {
            alert("please input Member ID ");
            return;
        }

        if (name == "") {
            alert("please input Member name ");
            return;
        }
        if (email == "") {
            alert("please input Member email ");
            return;
        }

        if (phone == "") {
            message("please input Member phone ");
            return;
        }
        if (pasword == "") {
            alert("please input Member password ");
            return;
        }

        if (phone.length != 10) {
            alert("Please input phone number in 10 numbers");
            return;
        }
        if (phone.substring(0, 2) != "05") {
            alert("input phone incorrect format and start with 05");
            return;
        }
        var exp = /^[0-9|]+$/;

        if (!exp.test(phone)) {
            alert("the phone must in number only ");
            return;
        }

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            alert("input Email incorrect format ");
            return;
        }
        
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/register.ashx",
            data: { id: id, name: name, phone: phone, email: email, pass: pasword },
            success: function (text) {
                var json = JSON.parse(text);
                alert(json.message);
            },
            error: function (data) { alert(data); }
        });
    }
    catch (e) { alert(e); }

}


