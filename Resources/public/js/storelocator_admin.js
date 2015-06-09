/**
 * Created by frank on 08.06.15.
 */


(function () {
    'use strict';

    var map;
    var marker;
    var geocoder = new google.maps.Geocoder();
    var addressInput;

    document.addEventListener('DOMContentLoaded', load, false);

    function load () {
        var latInput = document.getElementById('frank_storelocatorbundle_store_latitude');
        var longInput = document.getElementById('frank_storelocatorbundle_store_longitude');
        addressInput = document.getElementById('frank_storelocatorbundle_store_address');

        var latVal = latInput.value;
        var longVal = longInput.value;
        var center;

        //set map center if input value present
        if (latVal && longVal) {
            center = new google.maps.LatLng(latVal, longVal);
        } else {
            //default center when no latLong give (center of Europe)
            center = new google.maps.LatLng(48, 10);
        }

        map = new google.maps.Map(document.getElementById("map"), {
            center: center,
            zoom: 4,
            mapTypeId: 'roadmap',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        });

        google.maps.event.addListener(map, 'click', function (event) {
            clearLocations();

            var latLng = event.latLng;
            marker = new google.maps.Marker({position: latLng, map: map});

            geocodePosition(marker.getPosition());
            latInput.value = latLng.lat();
            longInput.value = latLng.lng();
        });
        addInitalMarker(latVal, longVal);
    }

    function geocodePosition (pos) {
        geocoder.geocode({
            latLng: pos
        }, function (responses) {
            if (responses && responses.length > 0) {
                // take first results address
                setInput(addressInput, responses[0].formatted_address);
            }
        });
    }

    function setInput (input, val) {
        input.value = val;
    }

    function addInitalMarker (lat, long) {
        var latLong = new google.maps.LatLng(lat, long);
        new google.maps.Marker({position: latLong, map: map});
    }

    function clearLocations () {
        if (marker) {
            marker.setMap(null);
        }
    }

}());
