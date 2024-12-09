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

// 祝日リストを定義
var holidays = ["2024-01-01", "2024-02-11", "2024-02-12", "2024-04-29",
                "2024-05-03", "2024-05-04", "2024-05-05", "2024-05-06",
                "2024-07-15", "2024-08-11", "2024-08-12", "2024-09-16",
                "2024-09-23", "2024-10-14", "2024-11-03", "2024-11-04",
                "2024-11-23", 
                // 2025年の祝日を定義
                "2025-01-01"
];

// 各バス停ごとの時刻表データ
var timetableData = {
    "学校行き（みなみ野）": { weekday: ['07:29', '07:38', '07:44', '07:52', '07:58',
                                      '08:06', '08:15', '08:19', '08:23', '08:27',],
                            saturday: ['08:06', '08:16', '08:33', '08:43', '09:10',
                                       '09:33', '10:04', '10:25', '10:56', '11:23',] },
    "学校行き（八王子）": { weekday: ['07:30', '07:40', '07:45', '07:50', '07:55',
                                    '07:59', '08:03', '08:07', '08:11', '08:15'],
                          saturday: ['07:55', '08:12', '08:25', '08:35', '08:51',
                                     '09:00', '09:08', '09:29', '09:44', '10:08',] },
    "学校行き（学生館）": { weekday: ['08:14', '08:28', '08:42', '08:56', '09:10',
                                    '09:30', '10:00', '10:24', '10:48', '12:00', ],
                          saturday: [] }
};

// 日付フィールドの制限設定
function setDateRestrictions() {
    var dateInput = document.getElementById("selectedDate");
    dateInput.addEventListener("change", function () {
        var selectedDate = this.value;
        var dayOfWeek = new Date(selectedDate).getDay();
        if (dayOfWeek === 0 || holidays.includes(selectedDate)) {
            alert("日曜日や祝日は選択できません。");
            this.value = "";
            document.getElementById("busStopSection").style.display = "none";
        } else {
            document.getElementById("busStopSection").style.display = "block";
            updateTimetable();
        }
    });
}

// 時刻表の更新
function updateTimetable() {
    var selectedDate = document.getElementById('selectedDate').value;
    if (!selectedDate) return;
    var dayOfWeek = new Date(selectedDate).getDay();
    window.isSaturday = (dayOfWeek === 6);
    document.getElementById("busStop").addEventListener("change", updateBusStopTimes); // 修正箇所
}

// バス停の時刻リストを更新
function updateBusStopTimes() {
    var selectedBusStop = document.getElementById('busStop').value;
    var timeSelect = document.getElementById('busTime');
    timeSelect.innerHTML = "";
    if (selectedBusStop && timetableData[selectedBusStop]) {
        var times = window.isSaturday ? timetableData[selectedBusStop].saturday : timetableData[selectedBusStop].weekday;
       
        // ローカルストレージから集計データを取得
        var storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};
        // ローカルストレージ2から集計データを取得
        var storedData2 = JSON.parse(localStorage.getItem("selectionCount2")) || {};
        var selectedDate = document.getElementById('selectedDate').value;

        // 曜日を取得
        var dayOfWeek = new Date(selectedDate).getDay();
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var currentDayName = dayNames[dayOfWeek];

         // 曜日別平均を計算
         // 曜日別の平均人数データ
         var averageData = {};
         
         // 曜日ごとのデータ数を記録
         var totalDays = {}; 
         
         // ローカルストレージ2のデータを曜日別に集計
         for (var date in storedData2) {
            var dateObj = new Date(date);
            var dayName = dayNames[dateObj.getDay()];
            if (!averageData[dayName]) {
                averageData[dayName] = {};
                totalDays[dayName] = 0;
            }
            if (storedData2[date][selectedBusStop]) {
                totalDays[dayName]++;
                var timeData = storedData2[date][selectedBusStop];
                for (var time in timeData) {
                    averageData[dayName][time] = (averageData[dayName][time] || 0) + Number(timeData[time]);
                }
            }
        }
        
        // 平均を計算
        for (var day in averageData) {
            if (totalDays[day] > 0) {
                for (var time in averageData[day]) {
                    averageData[day][time] = Math.round(averageData[day][time] / totalDays[day]);
                }
            }
        }

        // 選択肢に時間を追加し、予想利用人数を表示
        if (times && times.length > 0) {
            times.forEach(function(time) {
                var option = document.createElement('option');
                option.value = time;

                // 集計数を取得
                var count = storedData[selectedDate]?.[selectedBusStop]?.[time] || 0;
                
                // 予想利用人数を取得
                var predictedCount = averageData[currentDayName]?.[time] || "???";

                // 時間と現在の集計数と予想利用人数を表示
                option.textContent = `${time} （現在：${count}人 ／ 予想：${predictedCount}人）`;
            
                // 集計数に基づいて色を変更
                if (count >= 30) {
                    option.style.backgroundColor = "red"; // 30以上で赤色
                    if (predictedCount >= 30) {
                        option.textContent = `⚠️ ${time} （現在：${count}人 ／ 予想：${predictedCount}人）`;
                    }
                } else if (count >= 20) {
                    option.style.backgroundColor = "yellow"; // 20以上で黄色
                    if (predictedCount >= 30) {
                        option.textContent = `⚠️ ${time} （現在：${count}人 ／ 予想：${predictedCount}人）`;
                    }
                } else if (predictedCount >= 30){
                    option.textContent = `⚠️ ${time} （現在：${count}人 ／ 予想：${predictedCount}人）`; //機能を追加
                }
                timeSelect.appendChild(option);
            });
        } else {
            // 時間が存在しない場合のメッセージ
            var noBusOption = document.createElement('option');
            noBusOption.value = "";
            noBusOption.textContent = "※ 運休日 ※";
            timeSelect.appendChild(noBusOption);
        }
    } else {
        // 選択肢がない場合の処理
        var noBusOption = document.createElement('option');
        noBusOption.value = "";
        noBusOption.textContent = "※ 運休日 ※";
        timeSelect.appendChild(noBusOption);
    }
}

// 選択されたバス停と時刻を集計
function countSelectedRoutes() {
    var selectedDate = document.getElementById("selectedDate").value;
    var selectedBusStop = document.getElementById("busStop").value;
    var selectedTime = document.getElementById("busTime").value;
    if (!selectedDate || !selectedBusStop || !selectedTime) return;
    var storedData = JSON.parse(localStorage.getItem("selectionCount")) || {};
    var storedData2 = JSON.parse(localStorage.getItem("selectionCount2")) || {};
    
    // 日付ごとのデータ構造に基づいてデータを更新
    storedData[selectedDate] = storedData[selectedDate] || {};
    storedData[selectedDate][selectedBusStop] = storedData[selectedDate][selectedBusStop] || {};
    storedData[selectedDate][selectedBusStop][selectedTime] = (storedData[selectedDate][selectedBusStop][selectedTime] || 0) + 1;
    storedData2[selectedDate] = storedData2[selectedDate] || {};
    storedData2[selectedDate][selectedBusStop] = storedData2[selectedDate][selectedBusStop] || {};
    storedData2[selectedDate][selectedBusStop][selectedTime] = (storedData2[selectedDate][selectedBusStop][selectedTime] || 0) + 1;
    
    // 更新したデータを保存
    localStorage.setItem("selectionCount", JSON.stringify(storedData));
    localStorage.setItem("selectionCount2", JSON.stringify(storedData2));
    
    // 成功メッセージ
    alert("集計されました。");
    
    // 集計結果を反映
    updateTimetable();
}

// 集計ページに遷移
function showStats_resultPage() {
    window.location.href = "stats_result.html";
}

// 集計ページに遷移
function showStats_adminPage() {
    window.location.href = "stats_admin.html";
}

// ページロード時の初期設定
window.onload = function() {
    setDateRestrictions();
    document.getElementById("busStopSection").style.display = "none";
};