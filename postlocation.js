
function send(mode) {
    try {
        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/postlocation.ashx",
            data: {},
            success: function (text) {

                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);
                $('#alldata').empty();
                var i = 0;
                for (i = 0; i < obj.rows.length; i++) {

                    $('<li >').append('<h2> Title : ' + obj.rows[i].title + '</h2><h4> Description :' + obj.rows[i].description + '</h4><h4>' + obj.rows[i].postDate + '</h4><div data-role="controlgroup" data-type="horizontal"><a href="javascript:locationdata(\'' + obj.rows[i].lat + '\',\'' + obj.rows[i].lan + '\')" class="ui-btn ui-btn-inline ui-shadow">Location</a> <a href="javascript:canceldata(\'' + obj.rows[i].PostID + '\')" class="ui-btn ui-btn-inline ui-shadow">Cancel</a></div>').appendTo('#alldata');
                }
                $('#alldata').listview().listview('refresh');


            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}
function canceldata(id) {
    alert(id);

}
//========================================
function locationdata(lat, lan) {
   
     window.location = "https://maps.google.com/maps?q=" + lat + "," + lan;
}
