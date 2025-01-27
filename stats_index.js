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
                "2025-01-01", "2025-01-13", "2025-02-11", "2025-02-23",
                "2025-03-20", "2025-04-29", "2025-05-03", "2025-05-04",
                "2025-05-05", "2025-07-21", "2025-08-11", "2025-09-15",
                "2025-09-23", "2025-10-13", "2025-11-03", "2025-11-23"
];

// 各バス停ごとの時刻表データ
var timetableData = {
    /* 
    平日の到着時刻は7～10分後
    土曜日の到着時刻は7～12分後
    */
    "学校行き（みなみ野）": { weekday: ['07:29', '07:38', '07:44', '07:52', '07:58',
                                      '08:06', '08:15', '08:16 ~ 19', '08:20 ~ 24', 
                                      '08:25 ~ 29', '08:30 ~ 34', '08:35 ~ 39', '08:40 ~ 44', 
                                      '08:45 ~ 49', '08:50 ~ 54', '08:55 ~ 59', '09:00 ~ 04', 
                                      '09:05 ~ 09', '09:10 ~ 14', '09:15 ~ 19', '09:20 ~ 24', 
                                      '09:25', '09:34', '09:43', '09:54', '10:00', 
                                      '10:10', '10:18', '10:24', '10:30', '10:40', 
                                      '10:46', '10:56', '11:03', '11:16', '11:23', 
                                      '11:36', '11:43', '11:56', '12:03', '12:09', 
                                      '12:16', '12:23', '12:29', '12:36', '12:43', 
                                      '12:49', '12:56', '13:03', '13:16', '13:23', 
                                      '13:36', '13:43', '13:56', '14:03', '14:16', 
                                      '14:23', '14:36', '14:43', '14:56', '15:03', 
                                      '15:09', '15:20', '15:28', '15:41', '15:51', 
                                      '16:03', '16:15', '16:26', '16:36', '16:46', 
                                      '16:47 ~ 50','16:50 ~ 54', '16:55 ~ 59', '17:00 ~ 04', 
                                      '17:05 ~ 09', '17:10 ~ 14', '17:15 ~ 19', '17:20 ~ 24', 
                                      '17:25', '17:33', '17:43', '17:51', '18:00', 
                                      '18:08', '18:16', '18:27', '18:37', '18:49', 
                                      '18:59', '19:00 ~ 05', '19:06 ~ 10', '19:11', 
                                      '19:21', '19:32', '19:43', '19:54', '20:05', 
                                      '20:15', '20:25', '20:35', '20:45', '20:56', 
                                      '21:07', '21:14', '21:21', '21:27'],
                            saturday: ['08:06', '08:16', '08:33', '08:43', '09:10',
                                       '09:33', '10:04', '10:25', '10:56', '11:23', 
                                       '11:56', '12:36', '12:56', '13:16', '13:43', 
                                       '14:16', '14:43', '15:29', '15:49', '16:29', 
                                       '16:49', '17:09', '17:29', '17:49', '18:19', 
                                       '18:54', '19:18'] },
    /* 
    平日の到着時刻は12～18分後
    土曜日の到着時刻は12～15分後
    */
    "学校行き（八王子）": { weekday: ['07:30', '07:40', '07:45', '07:50', '07:55',
                                    '07:56 ~ 59', '08:00 ~ 04', '08:05 ~ 09', '08:10 ~ 14', 
                                    '08:15 ~ 19', '08:20 ~ 24', '08:25 ~ 29', '08:30 ~ 34', 
                                    '08:35 ~ 39', '08:40 ~ 44', '08:45 ~ 49', '08:50 ~ 54', 
                                    '08:55 ~ 59', '09:00 ~ 04', '09:05 ~ 09', '09:10 ~ 14', 
                                    '09:15', '09:20', '09:25', '09:30', '09:35',
                                    '09:40', '09:45', '09:50', '09:55', '10:00', 
                                    '10:05', '10:10', '10:15', '10:20', '10:25',
                                    '10:30', '10:35', '10:40', '10:45', '10:50', 
                                    '11:00', '11:10', '11:20', '11:30', '11:40', 
                                    '11:50', '12:05', '12:15', '12:20', '12:25', 
                                    '12:30', '12:35', '12:40', '12:45', '12:50', 
                                    '13:00', '13:10', '13:20', '13:30', '13:40', 
                                    '13:50', '14:00', '14:10', '14:20', '14:30',
                                    '14:40', '14:50', '15:00', '15:11', '15:12 ~ 17', 
                                    '15:18 ~ 23', '15:24 ~ 29', '15:30 ~ 35', '15:36 ~ 40', 
                                    '15:41', '15:51', '16:01', '16:11', '16:21', 
                                    '16:31', '16:32 ~ 37', '16:38 ~ 43', '16:44 ~ 49', 
                                    '16:50 ~ 55', '16:56 ~ 01', '17:02 ~ 07', '17:08 ~ 13', 
                                    '17:14 ~ 19', '17:20 ~ 25', '17:26 ~ 30', '17:31 ~ 35', 
                                    '17:36 ~ 40', '17:41', '17:51', '18:01', '18:11', 
                                    '18:21', '18:31', '18:41', '18:51', '18:52 ~ 57', 
                                    '18:58 ~ 03', '19:04 ~ 09', '19:10 ~ 15', '19:16 ~ 20', 
                                    '19:21', '19:31', '19:41', '19:51', '20:01', 
                                    '20:11', '20:21', '20:31', '20:41', '20:56', 
                                    '21:11', '21:21', '21:26', '21:31'],
                          saturday: ['07:55', '08:12', '08:25', '08:35', '08:51',
                                     '09:00', '09:08', '09:29', '09:44', '10:08', 
                                     '10:34', '11:16', '11:43', '12:11', '12:33', 
                                     '12:58', '13:32', '13:56', '14:31', '14:56', 
                                     '15:31', '16:05', '16:34', '17:01', '17:15', 
                                     '17:36', '17:55', '18:30', '18:55', '19:22'] },
    /* 
    平日の到着時刻は5～6分後
    */
    "学校行き（学生館）": { weekday: ['08:14', '08:28', '08:42', '08:56', '09:10',
                                    '09:30', '10:00', '10:24', '10:48', '12:00', 
                                    '12:44', '14:24', '14:54', '15:18', '16:04', 
                                    '16:28', '16:49', '17:08'],
                          saturday: [] },
    /* 
    平日の到着時刻は7～10分後
    土曜日の到着時刻は8分前後
    */
    "みなみ野駅行き": { weekday: ['07:22', '07:31', '07:37', '07:45', '07:51',
                                 '07:59', '08:08', '08:09 ~ 12', '08:13 ~ 15', 
                                 '08:16 ~ 19', '08:20 ~ 24', '08:25 ~ 29', '08:30 ~ 34',   
                                 '08:35 ~ 39', '08:40 ~ 44', '08:45 ~ 49', '08:50 ~ 54', 
                                 '08:55 ~ 59', '09:00 ~ 04', '09:05 ~ 09', '09:10 ~ 14', 
                                 '09:15 ~ 17', '09:18', '09:27', '09:36', '09:47', 
                                 '09:53', '10:03', '10:11', '10:17', '10:23', 
                                 '10:33', '10:39', '10:49', '10:56', '11:09', 
                                 '11:16', '11:29', '11:36', '11:49', '11:56', 
                                 '12:02', '12:09', '12:16', '12:22', '12:29', 
                                 '12:36', '12:42', '12:49', '12:56', '13:09', 
                                 '13:16', '13:29', '13:36', '13:49', '13:56', 
                                 '14:09', '14:16', '14:29', '14:36', '14:49', 
                                 '14:56', '15:02', '15:13', '15:21', '15:34', 
                                 '15:44', '15:56', '16:08', '16:19', '16:29', 
                                 '16:39', '16:40 ~ 44', '16:45 ~ 49', '16:50 ~ 54',
                                 '16:55 ~ 59', '17:00 ~ 04', '17:05 ~ 09', '17:10 ~ 14', 
                                 '17:15 ~ 17', '17:18', '17:26', '17:36', '17:44', 
                                 '17:53', '18:01', '18:09', '18:20', '18:30', 
                                 '18:42', '18:52', '18:53 ~ 58', '19:59 ~ 03', 
                                 '19:04', '19:14', '19:25', '19:36', '19:47', 
                                 '19:58', '20:08', '20:18', '20:28', '20:38', 
                                 '20:49', '21:00', '21:07', '21:14', '21:20'],
                       saturday: ['07:58', '08:08', '08:25', '08:35', '09:02',
                                  '09:25', '09:56', '10:17', '10:48', '11:15', 
                                  '11:48', '12:28', '12:48', '13:08', '13:35', 
                                  '14:08', '14:35', '15:21', '15:41', '16:21', 
                                  '16:41', '17:01', '17:21', '17:41', '18:11',
                                  '18:46', '19:10'] },
    /* 
    平日の到着時刻は12～15分後
    土曜日の到着時刻は12～15分後
    */
    "八王子駅行き": { weekday: ['07:15', '07:28', '07:33', '07:38', '07:43',
                               '07:44 ~ 47', '07:48 ~ 51', '07:52 ~ 55', '07:56 ~ 59', 
                               '08:00 ~ 03', '08:04 ~ 07', '08:08 ~ 11', '08:12 ~ 15', 
                               '08:16 ~ 19', '08:20 ~ 23', '08:24 ~ 27', '08:28 ~ 31',
                               '08:32 ~ 35', '08:36 ~ 39', '08:40 ~ 43', '08:44 ~ 47', 
                               '08:48 ~ 51', '08:52 ~ 55', '08:56 ~ 59', '09:00 ~ 02', 
                               '09:03', '09:08', '09:13', '09:18', '09:23',
                               '09:28', '09:33', '09:38', '09:43', '09:48', 
                               '09:53', '09:58', '10:03', '10:08', '10:13',
                               '10:18', '10:23', '10:28', '10:33', '10:38', 
                               '10:48', '10:58', '11:08', '11:18', '11:28', 
                               '11:38', '11:53', '12:03', '12:08', '12:13', 
                               '12:18', '12:23', '12:28', '12:33', '12:38', 
                               '12:48', '12:58', '13:08', '13:18', '13:28', 
                               '13:38', '13:48', '13:58', '14:08', '14:18',
                               '14:28', '14:38', '14:48', '15:00', '15:01 ~ 06', 
                               '15:07 ~ 12', '15:13 ~ 18', '15:19 ~ 24', '15:25 ~ 29', 
                               '15:30', '15:40', '15:50', '16:00', '16:10', 
                               '16:20', '16:21 ~ 24', '16:25 ~29', '16:30 ~ 34',
                               '16:35 ~ 39', '16:40 ~ 44', '16:45 ~ 49', '16:50 ~ 54',
                               '16:55 ~ 59', '17:00 ~ 04', '17:05 ~ 09', '17:10 ~ 14', 
                               '17:15 ~ 19', '17:20 ~ 24', '17:25 ~ 29', '17:30', 
                               '17:40', '17:50', '18:00', '18:10', '18:20', 
                               '18:30', '18:40', '18:41 ~ 46', '18:47 ~ 52', '18:53 ~ 58', 
                               '18:59 ~ 04', '19:05 ~ 09', '19:10', '19:20', 
                               '19:30', '19:40', '19:50', '20:00', '20:10', 
                               '20:20', '20:30', '20:45', '21:00', '21:10', 
                               '21:15', '21:20'],
                     saturday: ['07:43', '08:00', '08:13', '08:23', '08:39',
                                '08:48', '08:56', '09:17', '09:32', '09:56', 
                                '10:22', '11:04', '11:31', '11:59', '12:21', 
                                '12:46', '13:20', '13:44', '14:19', '14:44', 
                                '15:19', '15:53', '16:22', '16:49', '17:03', 
                                '17:24', '17:43', '18:18', '18:43', '19:10' ] },
    /* 
    平日の到着時刻は5～6分後
    */
    "学生館行き": { weekday: ['08:06', '08:22', '08:36', '08:50', '09:04',
                             '09:24', '09:54', '10:18', '10:42', '11:54', 
                             '12:38', '14:18', '14:48', '15:12', '15:58', 
                             '16:22', '16:43', '17:02'],
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
    document.getElementById("busStop").addEventListener("change", updateBusStopTimes);
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
                if (count >= 40) {
                    option.style.backgroundColor = "red";
                    if (predictedCount >= 40) {
                        option.textContent = `⚠️ ${time} （現在：${count}人 ／ 予想：${predictedCount}人）`;
                    }
                } else if (count >= 30) {
                    option.style.backgroundColor = "yellow";
                    if (predictedCount >= 40) {
                        option.textContent = `⚠️ ${time} （現在：${count}人 ／ 予想：${predictedCount}人）`;
                    }
                } else if (predictedCount >= 40){
                    option.textContent = `⚠️ ${time} （現在：${count}人 ／ 予想：${predictedCount}人）`;
                }
                timeSelect.appendChild(option);
            });
        } else {
            // 時刻が存在しない場合のメッセージ
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

     // ローカルストレージ1のデータを更新
     storedData[selectedDate] = storedData[selectedDate] || {};
     storedData[selectedDate][selectedBusStop] = storedData[selectedDate][selectedBusStop] || {};
     storedData[selectedDate][selectedBusStop][selectedTime] = 
         (storedData[selectedDate][selectedBusStop][selectedTime] || 0) + 1;
     
     // ローカルストレージ2のデータを更新
     storedData2[selectedDate] = storedData2[selectedDate] || {};
     storedData2[selectedDate][selectedBusStop] = storedData2[selectedDate][selectedBusStop] || {};
     storedData2[selectedDate][selectedBusStop][selectedTime] = 
         (storedData2[selectedDate][selectedBusStop][selectedTime] || 0) + 1;
 

    // 更新したデータを保存
    localStorage.setItem("selectionCount", JSON.stringify(storedData));
    localStorage.setItem("selectionCount2", JSON.stringify(storedData2));
    
    // 成功メッセージ
    alert("集計されました。");
    
    // 集計結果を反映
    updateTimetable();
}

// 結果一覧に遷移
function showStats_resultPage() {
    window.location.href = "stats_result.html";
}

// 管理に遷移
function showStats_adminPage() {
    window.location.href = "stats_admin.html";
}

// ページロード時の初期設定
window.onload = function() {
    setDateRestrictions();
    document.getElementById("busStopSection").style.display = "none";
};
