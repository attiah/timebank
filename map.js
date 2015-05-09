
var id = "";
var name = "";
var note = "";
var map;
var open = 0;
var markers = [];
function geturl() {
    try {
        var sURL = window.document.URL.toString();
        if (sURL.indexOf("?") > 0) {
            var arrParams = sURL.split("?");

            var arrURLParams = arrParams[1].split("&");

            var arrParamNames = new Array(arrURLParams.length);
            var arrParamValues = new Array(arrURLParams.length);

            var i = 0;
            for (i = 0; i < arrURLParams.length; i++) {
                var sParam = arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] != "")
                    arrParamValues[i] = unescape(sParam[1]);
                else
                    arrParamValues[i] = "No Value";
            }
            id = arrParamValues[0];
            name = arrParamValues[1];
            note = arrParamValues[2];
        }
    }
    catch (e) { }
}

function show() {
    geturl();
    initialize();
    send('show');
}

function send(mode) {
    try {

      
        document.getElementById("id").value = id;
        document.getElementById("name").value = name;
        document.getElementById("note").value = note;
        var lat = document.getElementById("tbn").value ;
        var lan = document.getElementById("tbe").value ;

        $.ajax({
            type: "POST",
            url: "http://www.tnaskills.com/execute/postmap.ashx",
            data: { mode: mode, id: id, lat: lat, lan: lan },
            success: function (text) {

                var obj = JSON.parse(text);
                if (obj.message != "") alert(obj.message);



                document.getElementById("tbn").value = obj.rows[0].lat;
                document.getElementById("tbe").value = obj.rows[0].lan;

                var ln = obj.rows[0].lat;
                var le = obj.rows[0].lan;
               
                deleteMarkers();
                if (ln != '' && le != '') {
                    addMarker(new google.maps.LatLng(ln, le));
                    showMarkers();
                    map.setCenter(markers[0].getPosition());
                }

            },
            error: function (text) { alert(text); }
        });
    }
    catch (e) { alert(e); }
}
//========================================
function showmap() {
    try {
        var op = document.getElementById("op").value;
        if (op == "") {
            toast("من فضلك حدد الموقع ");
            return;
        }
        var n = document.getElementById("lat" + op).value;
        var e = document.getElementById("lan" + op).value;
        document.getElementById("op").value = op;
        deleteMarkers();
        if (n != 0 && n != '') {
            addMarker(new google.maps.LatLng(n, e));
            showMarkers();
            map.setCenter(markers[0].getPosition());
        }
    } catch (e) { toast(e); }
}
//================
function initialize() {
    try {

        var center = new google.maps.LatLng(21.521753, 39.156389);
        var postion = new google.maps.LatLng(21.521753, 39.156389);

        var mapOptions = {
            zoom: 21,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            center: center
        };
        map = new google.maps.Map(document.getElementById("showdata"),
            mapOptions);

        google.maps.event.addListener(map, 'click', function (event) {

            var info = event.latLng.toString();
            info = info.substr(1, info.length - 2);
            //generate(info);
            var pos = info.split(',');
            document.getElementById('tbn').value = pos[0];
            document.getElementById('tbe').value = pos[1];

            deleteMarkers();
            addMarker(event.latLng);
            showMarkers();
        }
       );


    }
    catch (e) { generate(e); }

}

// Add a marker to the map and push to the array.
function addMarker(location) {

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);

    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

//===================
