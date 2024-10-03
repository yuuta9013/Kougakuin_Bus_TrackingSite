var map = L.map('map').setView([35.62702341561639, 139.33898667028086], 14); // 中心座標を設定

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// バスという文字をアイコンとして使用
var busIcon = L.divIcon({
    className: 'custom-bus-icon', // カスタムクラスを設定
    html: 'バス', // 表示する文字
    iconSize: [30, 30], // アイコンのサイズ
    iconAnchor: [15, 15] // アイコンの位置調整
});

var busLocations = [
    { coords: [35.62702341561639, 139.33898667028086], name: '八王子駅行き' },
    { coords: [35.62519493525218, 139.34105785827416], name: 'みなみ野駅行き' },
    { coords: [35.63149875364993, 139.32910313903676], name: '学校行き(みなみ野)' },
    { coords: [35.654351868130796, 139.33909241912187], name: '学校行き(八王子)' }
];

// バス停にカスタムアイコンを追加
busLocations.forEach(function(location) {
    L.marker(location.coords, { icon: busIcon }).addTo(map)
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
