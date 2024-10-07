// 地図の初期化
var map = L.map('map').setView([35.62702341561639, 139.33898667028086], 14);

// タイルレイヤーの追加
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// バス停の位置と名前
var busStops = [
    { coords: [35.62702341561639, 139.33898667028086], name: '八王子駅行き' },
    { coords: [35.62519493525218, 139.34105785827416], name: 'みなみ野駅行き' },
    { coords: [35.63149875364993, 139.32910313903676], name: '学校行き(みなみ野)' },
    { coords: [35.654351868130796, 139.33909241912187], name: '学校行き(八王子)' }
];

// バス停のマーカー追加
busStops.forEach(function(stop) {
    L.marker(stop.coords, { icon: busStopIcon }).addTo(map).bindPopup(stop.name);
});

// カスタムバスアイコン
var busIconYellow = L.divIcon({
    className: 'custom-bus-icon custom-bus-icon-yellow',
    html: 'バス',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

var busIconGreen = L.divIcon({
    className: 'custom-bus-icon custom-bus-icon-green',
    html: 'バス',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// バスの初期位置
var busMarker1 = L.marker([35.63149875364993, 139.32910313903676], { icon: busIconYellow }).addTo(map);
var busMarker2 = L.marker([35.654351868130796, 139.33909241912187], { icon: busIconGreen }).addTo(map);

// 選択されたバス停を画面中央に移動
function centerMapOnBusStop(stopCoords) {
    map.setView(stopCoords, 14); // 選択されたバス停を中心に
}
