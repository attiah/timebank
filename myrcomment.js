function send(mode) {
    try {
       
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/mycomment.ashx",
            data: {},
            success: function (text) {
               
                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {
                    $('<li >').append('<a href="#" class="ui-btn ui-btn-icon-left ui-icon-minus"><h2> ' + obj.rows[i].FullName + '</h2><h2> Title' + obj.rows[i].Title + '</h2><h4> Order Date: ' + obj.rows[i].OrderDate + '</h4><h4>Descrption :' + obj.rows[i].Note + '</h4><h4>Comment: ' + obj.rows[i].text + '</h4><h4> Comment Date: ' + obj.rows[i].GDate + '</h4></a>').appendTo('#alldata');
                }
                $('#alldata').listview().listview('refresh');
            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}
//========================================
