// メニューボタンの表示/非表示を切り替える関数
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

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

// 赤いピンアイコン（バス停用）
var busStopIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
});

// バス停のマーカーを追加
busStops.forEach(function(stop, index) {
    L.marker(stop.coords, { icon: busStopIcon }).addTo(map)
        .bindPopup(stop.name)
        .on('click', function() {
            document.getElementById('busStopSelect').value = index;
        });
});

// バス用の「バス」という文字アイコン（黄色）
var busIconYellow = L.divIcon({
    className: 'custom-bus-icon-yellow',
    html: 'バス',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// バス用の「バス」という文字アイコン（緑色）
var busIconGreen = L.divIcon({
    className: 'custom-bus-icon-green',
    html: 'バス',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

// バスの初期位置
var busMarker1 = L.marker([35.63149875364993, 139.32910313903676], { icon: busIconYellow }).addTo(map);
var busMarker2 = L.marker([35.654351868130796, 139.33909241912187], { icon: busIconGreen }).addTo(map);

// バスの経路
var busRoute1 = [
    [35.63149875364993, 139.32910313903676],
    [35.628582181573506, 139.3273876480203],
    [35.62573866716105, 139.32751258773246],
    [35.624189924807034, 139.33919445081705],
    [35.62519493525218, 139.34105785827416]  // みなみ野駅行き
];

var busRoute2 = [
    [35.654351868130796, 139.33909241912187],
    [35.6520834615058, 139.338027796126],
    [35.64031633699452, 139.33938105649864],
    [35.62702341561639, 139.33898667028086]  // 八王子駅行き
];

// バスを動かす関数
function moveBus(marker, route, delay) {
    var index = 0;
    setInterval(function() {
        marker.setLatLng(route[index]);
        checkProximity(marker);
        index = (index + 1) % route.length;
    }, delay);
}

// バス停に近づいているかチェック
function checkProximity(busMarker) {
    busStops.forEach(function(stop) {
        var busLatLng = busMarker.getLatLng();
        var stopLatLng = L.latLng(stop.coords[0], stop.coords[1]);
        var distance = busLatLng.distanceTo(stopLatLng);

        if (distance <= 100) {
            displayHint(`そろそろ${stop.name}にバスが近づいています！`);
        }
    });
}

// メッセージ表示
function displayHint(message) {
    const hintDiv = document.getElementById('hint');
    hintDiv.textContent = message;
    hintDiv.style.display = 'block';
    setTimeout(() => {
        hintDiv.style.display = 'none';
    }, 5000);
}

// バスを動かす
moveBus(busMarker1, busRoute1, 3000);
moveBus(busMarker2, busRoute2, 3000);

// バス停選択時の地図移動機能
document.getElementById('busStopSelect').addEventListener('change', function(e) {
    var selectedIndex = e.target.value;
    if (selectedIndex !== "") {
        var selectedStop = busStops[selectedIndex];
        map.setView(selectedStop.coords, 16, {
            animate: true,
            pan: { duration: 1 }
        });
        L.popup().setLatLng(selectedStop.coords).setContent(selectedStop.name).openOn(map);
    }
});
