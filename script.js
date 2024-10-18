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
            // バス停選択ドロップダウンで選択を同期
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

// バスを動かす関数
function moveBus(marker, route, delay) {
    var index = 0;
    function animate() {
        marker.setLatLng(route[index]);
        checkProximity(marker);
        index = (index + 1) % route.length;
        setTimeout(animate, delay);
    }
    animate();
}

// バスがバス停に近づいているかをチェック
function checkProximity(busMarker) {
    busStops.forEach(function(stop) {
        var busLatLng = busMarker.getLatLng();
        var stopLatLng = L.latLng(stop.coords[0], stop.coords[1]);
        var distance = busLatLng.distanceTo(stopLatLng);

        if (distance <= 100) { // 100メートル以内
            displayHint(`そろそろ${stop.name}にバスが近づいています！`);
        }
    });
}

// メッセージを表示する関数
function displayHint(message) {
    const hintDiv = document.getElementById('hint');
    hintDiv.textContent = message;
    hintDiv.style.display = 'block';
    setTimeout(() => {
        hintDiv.style.display = 'none'; // 5秒後にメッセージを非表示に
    }, 5000);
}

// バスの経路
var busRoute1 = [
    [35.63149875364993, 139.32910313903676],
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
    [35.653933576469534, 139.33815587125943],
    [35.6520834615058, 139.338027796126],
    [35.64943540986958, 139.33781433756303],
    [35.64947010105695, 139.3377574152825],
    [35.648070877364276, 139.33690358105275],
    [35.64659591556357, 139.3369476289423],
    [35.64479188827654, 139.33755954346742],
    [35.64287217347578, 139.33881183367228],
    [35.64031633699452, 139.33938105649864],
    [35.63787607295121, 139.33945220935402],
    [35.63595619196669, 139.33919605908176],
    [35.633897473198076, 139.33859837511642],
    [35.63094809269681, 139.3381287662923],
    [35.62804631043621, 139.3369238362886],
    [35.62717680878717, 139.3381676649419],
    [35.62702341561639, 139.33898667028086], // 八王子駅行き
    [35.62717680878717, 139.3381676649419],
    [35.62804631043621, 139.3369238362886],
    [35.63094809269681, 139.3381287662923],
    [35.633897473198076, 139.33859837511642],
    [35.63595619196669, 139.33919605908176],
    [35.63787607295121, 139.33945220935402],
    [35.64031633699452, 139.33938105649864],
    [35.64287217347578, 139.33881183367228],
    [35.64479188827654, 139.33755954346742],
    [35.64659591556357, 139.3369476289423],
    [35.648070877364276, 139.33690358105275],
    [35.64947010105695, 139.3377574152825],
    [35.64943540986958, 139.33781433756303],
    [35.6520834615058, 139.338027796126],
    [35.653933576469534, 139.33815587125943],
    [35.654351868130796, 139.33909241912187]  // 学校行き(八王子)に戻る
];

// バスを3秒ごとに動かす
moveBus(busMarker1, busRoute1, 3000);
moveBus(busMarker2, busRoute2, 3000);

// バス停選択時の地図移動機能
document.getElementById('busStopSelect').addEventListener('change', function(e) {
    var selectedIndex = e.target.value;
    if (selectedIndex === "") return; // 選択がない場合は何もしない

    var selectedStop = busStops[selectedIndex];
    if (selectedStop) {
        map.setView(selectedStop.coords, 16, {
            animate: true,
            pan: {
                duration: 1
            }
        });
        // ポップアップを表示
        L.popup()
            .setLatLng(selectedStop.coords)
            .setContent(selectedStop.name)
            .openOn(map);
    }
});
