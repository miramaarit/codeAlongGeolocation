document.getElementById("findme").addEventListener("click", geoFindMe)

let statusText = document.getElementById("status")

function geoFindMe()
{
   if(!navigator.geolocation)
   {
    statusText.innerHTML = "Det finns ingen geo-function"
   }
   else
   {
    statusText.innerHTML = "Letar..."
    navigator.geolocation.getCurrentPosition(funkar, fel)
   }
}

function funkar(position)
{
    const latitud = position.coords.latitude
    const longitud = position.coords.longitude
    const accuracy = position.coords.accuracy
    statusText.innerHTML = latitud + " " + longitud +" " +accuracy + " Avstånd till Nyköping"
    + getDistance(latitud, longitud, 59.370571, 16.513590, "k")

    openStreetMap(latitud, longitud)
}
function fel(error)
{
 alert(error)
}

function openStreetMap(lat, long)
{
    let latzoom = 0.01071819/2
    let longzoom = 0.020256042/2
    let marker = lat + "2C" + long

    let bbox = (long - longzoom) + "%2C" + (lat - latzoom) + "%2C" + (long + longzoom) + "%2C" + (lat + latzoom)
   
    let url = "https://www.openstreetmap.org/export/embed.html?bbox=" + bbox
    + "&layer=mapnik&marker=" + marker

    statusText.innerHTML = url

    document.getElementById("map").src= url
   
}
function getDistance(lat1, lon1, lat2, lon2, unit) {

    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    if (unit == "M") { dist = dist * 1609.344; dist = Math.round(dist) }
    console.log(dist)
    return dist
}