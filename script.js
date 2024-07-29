var map = L.map('map').setView([35.62519493525218, 139.34105785827416], 16); // 東京工科大学の図書館棟の座標

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var busLocation = [35.62519493525218, 139.34105785827416]; // バス停の新しい座標
L.marker(busLocation).addTo(map)
    .bindPopup('バスの位置')
    .openPopup();
