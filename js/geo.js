// //geolocationPage
// var x = document.getElementById("geoLocation");
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
// function showPosition(position) {
//     // x.innerHTML = "Latitude: " + position.coords.latitude +
//     "<br>Longitude: " + position.coords.longitude;
//     console.log(position.coords.latitude);
//     console.log(position.coords.longitude);
// }


// copied
//directionsPage
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var directionsMap;
var z = document.getElementById("map");
var start;
var end;
// obtém as coordenadas atreavés do hml geolocation
function getDirectionsLocation() {
    console.log("getDirectionsLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showDirectionsPosition);
    } else {
        z.innerHTML = "Geolocation is not supported by this browser.";
    }
}
// atribui as coordenadas as variáveis
// transforma em uma única variável
// chama a função que renderiza o mapa com a coordenada atual
function showDirectionsPosition(position) {
    console.log("showDirectionsPosition");
    directionsLatitude = position.coords.latitude;
    directionsLongitude = position.coords.longitude;
    directionsLatLng = new google.maps.LatLng(directionsLatitude, directionsLongitude);
    getDirections();
}

function getDirections() {
    console.log('getDirections');
    directionsDisplay = new google.maps.DirectionsRenderer();
    //start = new google.maps.LatLng(directionsLatLng);
    var directionsOptions = {
        zoom: 11,
        center: start
    }
    directionsMap = new google.maps.Map(document.getElementById("map"), directionsOptions);
    directionsDisplay.setMap(directionsMap);
    calcRoute();
}

function calcRoute() {
    console.log("calcRoute");
    start = directionsLatLng;
    end = "R. da Mangueira, 19 - Nazaré, Salvador - BA, 40040-400";
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
}

$(document).on("pageshow", "#map", function (event) {
    getDirectionsLocation();
});

var api_key = 'AIzaSyAX_PKkg_C4cv8l5onTyx1QvK4Rp0IGDQk' ;