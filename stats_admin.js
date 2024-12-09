// メニューボタンの表示/非表示を切り替える関数
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// サブメニューの表示/非表示を切り替える関数
function toggleSubMenu(event) {
    event.preventDefault();
    var submenu = document.getElementById("submenu");
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
    } else {
        submenu.style.display = "block";
    }
}

// 初期化：マスターIDとパスワード
const masterId = "master";
const masterPassword = "password123";
// ログインチェック
function login() {
    const id = prompt("IDを入力してください:");
    const password = prompt("パスワードを入力してください:");
    // ローカルストレージからIDとパスワードを取得
    const authData = JSON.parse(localStorage.getItem("authData")) || {};
    if ((id === masterId && password === masterPassword) || authData[id] === password) {
        alert("ログイン成功");
        return true;
    } else {
        alert("ログイン失敗。IDまたはパスワードが違います。");
        return false;
    }
}
// ページロード時にログインチェック
document.addEventListener("DOMContentLoaded", function () {
    if (!login()) {
        document.body.innerHTML = "<h2>アクセスが拒否されました</h2>";
    }
});

// 集計結果1の表示
// 日付変更時にリセット
function onDateChange() {
    document.getElementById("busStop").value = "";
    document.getElementById("summary").innerHTML = "";
}

// バス停が選択された際に表示する集計データを更新
function updateSummary() {
    var selectedDate = document.getElementById("selectedDate").value;
    var selectedBusStop = document.getElementById("busStop").value;
    var summaryContainer = document.getElementById("summary");
    summaryContainer.innerHTML = "";
    
    if (!selectedDate || !selectedBusStop) return;
    
    // ローカルストレージから日付ごとのデータを取得
    var storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};
    var busStopData = storedData[selectedDate] && storedData[selectedDate][selectedBusStop];
    
    if (busStopData) {
        // 表形式で集計結果を表示
        var table = document.createElement("table");
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>時間</th><th>集計数</th><th>変更</th><th>削除</th>";
        table.appendChild(headerRow);
        
        // 時間でソート
        var sortedTimes = Object.keys(busStopData).sort();
        sortedTimes.forEach(function(time) {
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + time + "</td><td>" + busStopData[time] + "回</td>";
            
            // 変更ボタン
            var editButton = document.createElement("button");
            editButton.textContent = "変更";
            editButton.classList.add("edit-button");
            editButton.onclick = function() {
                authenticateAndEdit(time);
            };
            
            // 削除ボタン
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "削除";
            deleteButton.classList.add("delete-button");
            deleteButton.onclick = function() {
                authenticateAndDelete(time);
            };
            
            // 変更と削除のセル
            var editCell = document.createElement("td");
            var deleteCell = document.createElement("td");
            editCell.appendChild(editButton);
            deleteCell.appendChild(deleteButton);
            
            row.appendChild(editCell);
            row.appendChild(deleteCell);
            
            table.appendChild(row);
            
            // 集計数に応じた背景色を設定
            if (busStopData[time] >= 30) {
                row.cells[1].style.backgroundColor = "red";  // 30以上は黄色
            } else if (busStopData[time] >= 20) {
                row.cells[1].style.backgroundColor = "yellow";  // 20以上は赤色
            }
        });
        
        summaryContainer.appendChild(table);
    } else {
        summaryContainer.innerHTML = "<p>データがありません。</p>";
    }
}

// 認証と変更
function authenticateAndEdit(time) {
var password = prompt("4桁のパスワードを入力してください:");
if (password === "1234") {
    var newCount = prompt(time + "の新しい集計数を入力してください:");
    if (newCount !== null) {
        var selectedDate = document.getElementById("selectedDate").value;
        var selectedBusStop = document.getElementById("busStop").value;
        var storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};
        var storedData2 = JSON.parse(localStorage.getItem("selectionCount2")) || {};

        if (!storedData[selectedDate]) {
            storedData[selectedDate] = {};
        }
        if (!storedData[selectedDate][selectedBusStop]) {
            storedData[selectedDate][selectedBusStop] = {};
        }

        if (!storedData2[selectedDate]) {
            storedData2[selectedDate] = {};
        }
        if (!storedData2[selectedDate][selectedBusStop]) {
            storedData2[selectedDate][selectedBusStop] = {};
        }

        // 新しい集計数を設定
        storedData[selectedDate][selectedBusStop][time] = newCount;
        storedData2[selectedDate][selectedBusStop][time] = newCount;

        // 両方のローカルストレージに保存
        localStorage.setItem("selectionCount", JSON.stringify(storedData));
        localStorage.setItem("selectionCount2", JSON.stringify(storedData2));
        
        updateSummary();
        alert("集計数が変更されました。");
    }
} else {
    alert("パスワードが間違っています。");
}
}

// 認証と削除
function authenticateAndDelete(time) {
    var password = prompt("4桁のパスワードを入力してください:");
    if (password === "1234") {
        var selectedDate = document.getElementById("selectedDate").value;
        var selectedBusStop = document.getElementById("busStop").value;
        var storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};
        delete storedData[selectedDate][selectedBusStop][time];
        localStorage.setItem("selectionCount", JSON.stringify(storedData));
        updateSummary();
        alert("集計データが削除されました。");
    } else {
        alert("パスワードが間違っています。");
    }
}

// データ１をリセットする処理
function resetData() {
    var password = document.getElementById("password").value;
    if (password !== "1234") {
        alert("パスワードが間違っています。");
        return;
    }
    localStorage.removeItem("selectionCount");
    alert("集計データがリセットされました。");
    document.getElementById("summary").innerHTML = "";
}

// 集計ページに遷移
function showStats_indexPage() {
    window.location.href = "stats_index.html";
 }

// 保存ページに遷移
function showStats_saveDataPage() {
    window.location.href = "stats_saveData.html";
 }