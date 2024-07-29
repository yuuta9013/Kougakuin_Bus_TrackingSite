var map = L.map('map').setView([35.62702341561639, 139.33898667028086], 14); // 中心座標を設定

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var busLocations = [
    [35.62702341561639, 139.33898667028086],
    [35.62519493525218, 139.34105785827416],
    [35.63149875364993, 139.32910313903676],
    [35.654351868130796, 139.33909241912187]
];

busLocations.forEach(function(location) {
    L.marker(location).addTo(map)
        .bindPopup('バスの位置');
});
