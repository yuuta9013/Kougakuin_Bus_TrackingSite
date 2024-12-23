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

// 日付変更時にリセットして全ての時間を表示
function onDateChange() {
    document.getElementById("summaryBusStop").value = "";
    updateTotalSummary();
    updateSummary();
    autoUpdateGraphFromDate();
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
    var selectedBusStop = document.getElementById("summaryBusStop").value;
    var summaryContainer = document.getElementById("summary");
    var busStopTotalContainer = document.getElementById("busStopTotal");
    summaryContainer.innerHTML = "";
    busStopTotalContainer.innerHTML = "<p>バス停の集計人数がここに表示されます。</p>";

    // 日付が選択されていない場合は終了
    if (!selectedDate) return;

    // ローカルストレージから日付ごとのデータを取得
    var storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};

    // バス停名が選択されている場合のみ集計データを表示
    if (selectedBusStop && storedData[selectedDate] && storedData[selectedDate][selectedBusStop]) {
        var busStopData = storedData[selectedDate][selectedBusStop];
        var total = 0;
        var table = document.createElement("table");
        var headerRow = document.createElement("tr");
        headerRow.innerHTML = "<th>時間</th><th>集計人数</th>";
        table.appendChild(headerRow);

        // 時間のキーを配列にしてソート
        var sortedTimes = Object.keys(busStopData).sort();
        sortedTimes.forEach(function(time) {
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + time + "</td><td>" + busStopData[time] + "人</td>";
            table.appendChild(row);
            total += Number(busStopData[time]);

            // 集計数に応じた背景色を設定
            if (busStopData[time] >= 30) {
                row.cells[1].style.backgroundColor = "red";
            } else if (busStopData[time] >= 20) {
                row.cells[1].style.backgroundColor = "yellow";
            }
        });

        summaryContainer.appendChild(table);
        busStopTotalContainer.innerHTML = `<p>バス停の集計人数: ${total}人</p>`;
    } else {
        summaryContainer.innerHTML = "<p>データがありません。</p>";
    }
}

// グラフ描画 (ローカルストレージ1と2を比較)
function drawGraph(data1, data2, canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    // ラベルの統合（重複を除く）
    const labels = [...new Set([...data1.map(item => item.time), ...data2.map(item => item.time)])].sort();
    // データの準備（ラベルに基づき値を補完）
    const values1 = labels.map(label => {
        const found = data1.find(item => item.time === label);
        return found ? found.average : 0;
    });
    const values2 = labels.map(label => {
        const found = data2.find(item => item.time === label);
        return found ? found.average : 0;
    });
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '今期',
                    data: values1,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: '例年',
                    data: values2,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// グラフを更新
function updateGraph() {
    const dayOfWeek = document.getElementById("dayOfWeek").value;
    const busStop = document.getElementById("busStop").value;
    const storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};
    const storedData2 = JSON.parse(localStorage.getItem("selectionCount2")) || {};
    if (!dayOfWeek || !busStop) {
        alert("曜日とバス停を選択してください。");
        return;
    }
    const usageData1 = {};
    const usageData2 = {};
    let totalDays1 = 0;
    let totalDays2 = 0;

    // データを集計（ローカルストレージ1）
    for (const date in storedData) {
        const dateObj = new Date(date);
        const day = dateObj.toLocaleDateString("en-US", { weekday: 'long' });
        if (day === dayOfWeek && storedData[date][busStop]) {
            totalDays1++;
            const timeData = storedData[date][busStop];
            for (const time in timeData) {
                usageData1[time] = (usageData1[time] || 0) + Number(timeData[time]);
            }
        }
    }

    // データを集計（ローカルストレージ2）
    for (const date in storedData2) {
        const dateObj = new Date(date);
        const day = dateObj.toLocaleDateString("en-US", { weekday: 'long' });
        if (day === dayOfWeek && storedData2[date][busStop]) {
            totalDays2++;
            const timeData = storedData2[date][busStop];
            for (const time in timeData) {
                usageData2[time] = (usageData2[time] || 0) + Number(timeData[time]);
            }
        }
    }
    if (totalDays1 === 0 && totalDays2 === 0) {
        alert("選択した条件に一致するデータがありません。");
        return;
    }

    // 平均値を計算
    const averageData1 = Object.keys(usageData1).sort().map(time => ({
        time,
        average: (usageData1[time] / totalDays1).toFixed(2)
    }));
    const averageData2 = Object.keys(usageData2).sort().map(time => ({
        time,
        average: (usageData2[time] / totalDays2).toFixed(2)
    }));
    
    // グラフを描画
    drawGraph(averageData1, averageData2, 'usageGraph');
}

// 検索・集計に遷移
function showStats_indexPage() {
    window.location.href = "stats_index.html";
}
