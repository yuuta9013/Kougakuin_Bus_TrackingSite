// 仮の遅延情報と到着予定時刻
var delayInfo = {
    '八王子駅行き': '遅延なし',
    'みなみ野駅行き': '5分遅延',
    '学校行き(みなみ野)': '10分遅延',
    '学校行き(八王子)': '遅延なし'
};

// メール通知機能
document.getElementById('register').addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var selectedBusStop = document.getElementById('busStopSelect').value;
    var busStopName = busLocations[selectedBusStop].name;
    var message = `バス停: ${busStopName}\n遅延情報: ${delayInfo[busStopName]}\n到着予定時刻が近づいています。`;

    if (email) {
        alert(`メール通知を登録しました。\n\n${message}`);
        // 実際のメール送信機能はサーバーサイドで実装する必要があります。
    } else {
        alert('メールアドレスを入力してください。');
    }
});

// バスの位置情報ページに戻る
document.getElementById('backToMap').addEventListener('click', function() {
    window.location.href = 'index.html';
});
