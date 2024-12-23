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
document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("loginModal");
    loginModal.style.display = "block";
});
// ログイン検証
function validateLogin() {
    const id = document.getElementById("loginId").value;
    const password = document.getElementById("loginPassword").value;
    // ローカルストレージまたは固定データと照合
    const authData = JSON.parse(localStorage.getItem("authData")) || {};
    if ((id === masterId && password === masterPassword) || authData[id] === password) {
        alert("ログイン成功");
        document.getElementById("loginModal").style.display = "none";
    } else {
        alert("ログイン失敗。IDまたはパスワードが違います。");
    }
}

// 集計結果1の表示
// 日付変更時にリセット
function onDateChange() {
    document.getElementById("busStop").value = "";
    document.getElementById("summary").innerHTML = "";
    updateTotalSummary();
    updateSummary();
}

// 全体集計数を計算して表示
function updateTotalSummary() {
    var selectedDate = document.getElementById("selectedDate").value;
    var totalSummaryContainer = document.getElementById("totalSummary");
    totalSummaryContainer.innerHTML = "<p>全体の総集計人数がここに表示されます。</p>"; 
    if (!selectedDate) return;

    // ローカルストレージからデータ取得
    var storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};
    if (storedData[selectedDate]) {
        var total = 0;

        // 日付の全バス停の集計数を合計
        for (var busStop in storedData[selectedDate]) {
            for (var time in storedData[selectedDate][busStop]) {
                total += Number(storedData[selectedDate][busStop][time]);
            }
        }
        totalSummaryContainer.innerHTML = `<p>全体の総集計人数: ${total}人</p>`;
    } else {
        totalSummaryContainer.innerHTML = "<p>データがありません。</p>";
    }
}

// バス停が選択された際に表示する集計データを更新
function updateSummary() {
    var selectedDate = document.getElementById("selectedDate").value;
    var selectedBusStop = document.getElementById("busStop").value;
    var summaryContainer = document.getElementById("summary");
    var busStopTotalContainer = document.getElementById("busStopTotal");
    summaryContainer.innerHTML = "";
    busStopTotalContainer.innerHTML = "<p>バス停の集計人数がここに表示されます。</p>";
    
    if (!selectedDate || !selectedBusStop) return;
    
    // ローカルストレージから日付ごとのデータを取得
    var storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};
    var busStopData = storedData[selectedDate] && storedData[selectedDate][selectedBusStop];
    
    if (busStopData) {
        // 表形式で集計結果を表示
        var total = 0;
        var table = document.createElement("table");
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>時間</th><th>集計人数</th><th>変更</th><th>削除</th>";
        table.appendChild(headerRow);
        
        // 時間でソート
        var sortedTimes = Object.keys(busStopData).sort();
        sortedTimes.forEach(function(time) {
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + time + "</td><td>" + busStopData[time] + "人</td>";
            
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
            total += Number(busStopData[time]);
            
            // 集計数に応じた背景色を設定
            if (busStopData[time] >= 30) {
                row.cells[1].style.backgroundColor = "red";  // 30以上は黄色
            } else if (busStopData[time] >= 20) {
                row.cells[1].style.backgroundColor = "yellow";  // 20以上は赤色
            }
        });
        
        summaryContainer.appendChild(table);
        busStopTotalContainer.innerHTML = `<p>バス停の集計人数: ${total}人</p>`;
    } else {
        summaryContainer.innerHTML = "<p>データがありません。</p>";
    }
}

// 認証と変更
function authenticateAndEdit(time) {
var password = prompt("4桁のパスワードを入力してください:");
if (password === "1234") {
    var newCount = prompt(time + "の新しい集計人数を入力してください:");
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
        alert("集計人数が変更されました。");
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
        var storedData2 = JSON.parse(localStorage.getItem("selectionCount2")) || {};
        delete storedData[selectedDate][selectedBusStop][time];
        delete storedData2[selectedDate][selectedBusStop][time];
        localStorage.setItem("selectionCount", JSON.stringify(storedData));
        localStorage.setItem("selectionCount2", JSON.stringify(storedData2));
        updateSummary();
        alert("集計データが削除されました。");
    } else {
        alert("パスワードが間違っています。");
    }
}

// 今期のデータをリセットする処理（前期、後期ごとにリセット）
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

// 検索・集計に遷移
function showStats_indexPage() {
    window.location.href = "stats_index.html";
}

// データ保管庫に遷移
function showStats_saveDataPage() {
    window.location.href = "stats_savedata.html";
}
