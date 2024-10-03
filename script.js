// 地図の初期化
var map = L.map('map').setView([35.62702341561639, 139.33898667028086], 14); // 中心座標を設定

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

// 赤いピンアイコン（バス停用）
var busStopIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 赤いピンの画像URL
    iconSize: [25, 41], // サイズ
    iconAnchor: [12, 41], // アンカー位置（下部中央）
    popupAnchor: [0, -41] // ポップアップの位置
});

// バス停のマーカーを追加
busStops.forEach(function(stop) {
    L.marker(stop.coords, { icon: busStopIcon }).addTo(map)
        .bindPopup(stop.name);
});

// バス用の「バス」という文字アイコン
var busIcon = L.divIcon({
    className: 'custom-bus-icon',
    html: 'バス',
    iconSize: [30, 30], // アイコンサイズ
    iconAnchor: [15, 15] // 中心をアンカーにする
});

// バスの初期位置
var busMarker1 = L.marker([35.63149875364993, 139.32910313903676], { icon: busIcon }).addTo(map); // 学校行き(みなみ野)
var busMarker2 = L.marker([35.654351868130796, 139.33909241912187], { icon: busIcon }).addTo(map); // 学校行き(八王子)

// バスの経路
var busRoute1 = [
    [35.63149875364993, 139.32910313903676], // 学校行き(みなみ野)
    [35.62519493525218, 139.34105785827416]  // みなみ野駅行き
];
var busRoute2 = [
    [35.654351868130796, 139.33909241912187], // 学校行き(八王子)
    [35.62702341561639, 139.33898667028086]  // 八王子駅行き
];

// バスを動かす関数
function moveBus(marker, route, delay) {
    var index = 0;
    function animate() {
        marker.setLatLng(route[index]);
        index = (index + 1) % route.length;
        setTimeout(animate, delay);
    }
    animate();
}

// バスを3秒ごとに動かす
moveBus(busMarker1, busRoute1, 3000);
moveBus(busMarker2, busRoute2, 3000);
