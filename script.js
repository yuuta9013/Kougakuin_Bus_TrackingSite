var map = L.map('map').setView([35.6895, 139.6917], 12); // 東京の中心座標

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var busLocation = [35.6895, 139.6917]; // 仮のバス位置
L.marker(busLocation).addTo(map)
    .bindPopup('バスの位置')
    .openPopup();
