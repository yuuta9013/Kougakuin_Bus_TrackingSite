var map = L.map('map').setView([35.642, 139.317], 16); // 日本工学院八王子専門学校の図書館棟前の座標

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var busLocation = [35.642, 139.317]; // バス停の新しい座標
L.marker(busLocation).addTo(map)
    .bindPopup('バスの位置')
    .openPopup();
