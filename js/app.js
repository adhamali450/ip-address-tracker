const ipAddress = document.getElementById("lbl_ip_address");
const ipLocation = document.getElementById("lbl_location");
const timezone = document.getElementById("lbl_timezone");
const isp = document.getElementById("lbl_isp");
const input = document.getElementById("ip_field");
var map = L.map('mapid');

let lat;
let lng;

const displayMap = () => {
    var markerIcon = L.icon({
        iconUrl: 'images/icon-location.svg',

        iconSize: [46, 56], // size of the icon
        iconAnchor: [23, 55], // point of the icon which will correspond to marker's location
    });
    map.setView([lat, lng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: false
    }).addTo(map);

    L.marker([lat, lng], { icon: markerIcon }).addTo(map)

};

const displayIpInfos = (data) => {
    ipAddress.innerText = data.ip;
    ipLocation.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    timezone.innerText = `UTC ${data.location.timezone}`;
    isp.innerText = data.isp;
};

const getIpInfos = (ipAddress = "") => {
    fetch(`https://geo.ipify.org/api/v1?apiKey=at_bwNTqD06XUVcaxrTmxn3dzILpB96I&ipAddress=${ipAddress}`)
        .then(response => response.json())
        .then(data => {
            lat = data.location.lat;
            lng = data.location.lng;
            displayIpInfos(data);
            displayMap();
        })
};


input.addEventListener("submit", event => {
    event.preventDefault()
    getIpInfos(event.target[0].value);
    event.target[0].value = "";
});

window.onload = function () {
    getIpInfos();
}

btn_go.onclick = function () {
    getIpInfos(ip_field.value);
};

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        getIpInfos(ip_field.value);
    }
});