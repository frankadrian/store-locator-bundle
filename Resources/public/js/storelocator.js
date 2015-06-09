/**
 * Created by frank on 08.06.15.
 */


(function () {
    'use strict';

    var map;
    var markers = [];
    var infoWindow;

    document.addEventListener('DOMContentLoaded', load, false);

    function load () {
        map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(48, 10),
            zoom: 4,
            mapTypeId: 'roadmap',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        });
        infoWindow = new google.maps.InfoWindow();


        //search on click
        google.maps.event.addListener(map, 'click', function (event) {
            searchLocationsNear(event.latLng);
        });

        var submit = document.getElementById('search');
        submit.onclick = function () {
            searchLocations();
        };
    }

    function searchLocations () {
        var address = document.getElementById("addressInput").value;
        var geocoder = new google.maps.Geocoder();
        if (address) {
            geocoder.geocode({address: address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    searchLocationsNear(results[0].geometry.location);
                } else {
                    alert(address + ' not found');
                }
            });
        } else {
            //search all stores
            searchLocationsNear(map.getCenter());
        }
    }

    function clearLocations () {
        infoWindow.close();
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers.length = 0;
    }

    function searchLocationsNear (center) {
        clearLocations();

        var radius = document.getElementById('radiusSelect').value;
        var searchUrl = '/app_dev.php/store/search?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius;

        searchStores(searchUrl, function (response) {
            //hoisting
            var bounds, data, len, i;
            response = JSON.parse(response);

            data = response.data;
            if (data) {
                len = data.length;
                for (i = 0; i < len; i++) {
                    var name = data[i].name;
                    var address = data[i].address;
                    var distance = parseFloat(data[i].distance);
                    var latlng = new google.maps.LatLng(
                        parseFloat(data[i].latitude),
                        parseFloat(data[i].longitude));

                    createOption(name, distance, i);
                    createMarker(latlng, name, address);

                    if (!bounds) {
                        bounds = new google.maps.LatLngBounds();
                    }
                    bounds.extend(latlng);
                }
                map.fitBounds(bounds);
            }
        });

    }

    function createMarker (latlng, name, address) {
        var html = "<b>" + name + "</b> <br/>" + address;
        var marker = new google.maps.Marker({
            map: map,
            position: latlng
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
        });
        markers.push(marker);
    }

    function createOption (name, distance, num) {
        var option = document.createElement("option");
        option.value = num;
        option.innerHTML = name + "(" + distance.toFixed(1) + ")";
    }

    function searchStores (url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                request.onreadystatechange = doNothing;
                callback(request.responseText, request.status);
            }
        };

        request.open('POST', url, true);
        request.send(null);
    }

    function doNothing () {
    }

}());
