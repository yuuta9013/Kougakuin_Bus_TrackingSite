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
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // 赤いピンの画像URL
    iconSize: [25, 41], // サイズ
    iconAnchor: [12, 41], // アンカー位置（下部中央）
    popupAnchor: [0, -41], // ポップアップの位置
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
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
    iconSize: [30, 30], // アイコンのサイズ
    iconAnchor: [15, 15] // アイコンの中心をアンカーにする
});

// バスの初期位置
var busMarker1 = L.marker([35.63149875364993, 139.32910313903676], { icon: busIcon }).addTo(map); // 学校行き(みなみ野)
var busMarker2 = L.marker([35.654351868130796, 139.33909241912187], { icon: busIcon }).addTo(map); // 学校行き(八王子)

// バスの経路
var busRoute1 = [
    [35.63149875364993, 139.32910313903676], // 学校行き(みなみ野)
    [35.63048626415159, 139.3281997561492],
    [35.628582181573506, 139.3273876480203],
    [35.62573866716105, 139.32751258773246],
    [35.62672883097773, 139.33013632168726],
    [35.62617027853748, 139.33297870013834],
    [35.62385986108326, 139.33625836758188],
    [35.624189924807034, 139.33919445081705],
    [35.62519493525218, 139.34105785827416], // みなみ野駅行き
    [35.624189924807034, 139.33919445081705],
    [35.62578710508726, 139.33784564013578],
    [35.6280132094066, 139.33687383724123],
    [35.629664795138254, 139.3375806029827],
    [35.63095731669296, 139.33811067728885],
    [35.63158561823342, 139.336078725782],
    [35.63242932967649, 139.33367130497493],
    [35.63303966859972, 139.33172769916854],
    [35.633614100951455, 139.32985035266762],
    [35.63153176403544, 139.32879020405537],
    [35.63149875364993, 139.32910313903676]  // 学校行き(みなみ野)に戻る
];
var busRoute2 = [
    [35.654351868130796, 139.33909241912187], // 学校行き(八王子)
    [35.62702341561639, 139.33898667028086], // 八王子駅行き
    [35.654351868130796, 139.33909241912187]  // 学校行き(八王子)に戻る
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
