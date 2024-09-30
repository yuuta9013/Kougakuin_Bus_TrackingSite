// script.js

var map = L.map('map').setView([35.62702341561639, 139.33898667028086], 14); // 中心座標を設定

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var busLocations = [
    { coords: [35.62702341561639, 139.33898667028086], name: '八王子駅行き' },
    { coords: [35.62519493525218, 139.34105785827416], name: 'みなみ野駅行き' },
    { coords: [35.63149875364993, 139.32910313903676], name: '学校行き(みなみ野)' },
    { coords: [35.654351868130796, 139.33909241912187], name: '学校行き(八王子)' }
];

busLocations.forEach(function(location) {
    L.marker(location.coords).addTo(map)
        .bindPopup(location.name);
});

// 地図の表示範囲をすべてのマーカーが表示されるように調整
var bounds = L.latLngBounds(busLocations.map(function(location) { return location.coords; }));
map.fitBounds(bounds);

// バス停の選択機能を追加
document.getElementById('busStopSelect').addEventListener('change', function(e) {
    var selectedLocation = busLocations[e.target.value];
    map.setView(selectedLocation.coords, 16, {
        animate: true,
        pan: {
            duration: 1
        }
    });
    L.popup()
        .setLatLng(selectedLocation.coords)
        .setContent(selectedLocation.name)
        .openOn(map);
});

// 通知オプションページへの遷移
document.getElementById('notificationOptions').addEventListener('click', function() {
    window.location.href = 'notification.html';
});

// バスの移動経路を定義
var routes = {
    '学校行き(みなみ野)': [
        [35.63149875364993, 139.32910313903676], // 学校行き(みなみ野)
        [35.62702341561639, 139.33898667028086], // 八王子駅行き
        [35.62519493525218, 139.34105785827416], // みなみ野駅行き
        [35.62702341561639, 139.33898667028086]  // 学校行き(みなみ野)に戻る
    ],
    '学校行き(八王子)': [
        [35.654351868130796, 139.33909241912187], // 学校行き(八王子)
        [35.62702341561639, 139.33898667028086],  // 八王子駅行き
        [35.654351868130796, 139.33909241912187]  // 学校行き(八王子)に戻る
    ]
};

// バスのマーカーを作成
var buses = {
    'みなみ野行きバス': L.marker(routes['学校行き(みなみ野)'][0], {icon: L.icon({
        iconUrl: 'images/bus-icon.png', // パスを修正
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    })}).addTo(map).bindPopup('みなみ野行きバス'),

    '八王子行きバス': L.marker(routes['学校行き(八王子)'][0], {icon: L.icon({
        iconUrl: 'images/bus-icon.png', // パスを修正
        iconSize: [25, 25],
        iconAnchor: [12, 12]
    })}).addTo(map).bindPopup('八王子行きバス')
};

// バスの移動関数
function moveBus(busName, route, index = 0) {
    if (index >= route.length) {
        index = 0; // ルートの最後に達したら最初に戻る
    }

    buses[busName].setLatLng(route[index]);

    // 次の移動を設定（例: 2秒ごとに移動）
    setTimeout(function() {
        moveBus(busName, route, index + 1);
    }, 2000);
}

// バスの移動を開始
moveBus('みなみ野行きバス', routes['学校行き(みなみ野)']);
moveBus('八王子行きバス', routes['学校行き(八王子)']);
