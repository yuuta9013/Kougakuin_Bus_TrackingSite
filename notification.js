// notification.js

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
    var busStopName = [
        '八王子駅行き',
        'みなみ野駅行き',
        '学校行き(みなみ野)',
        '学校行き(八王子)'
    ][selectedBusStop];
    var message = `バス停: ${busStopName}\n遅延情報: ${delayInfo[busStopName]}\n到着予定時刻が近づいています。`;

    if (email) {
        // EmailJSを使用してメールを送信
        emailjs.send("service_w0h9u2p", "template_cys7gws", {
            to_email: email,
            bus_stop: busStopName,
            delay_info: delayInfo[busStopName],
            message: message
        })
        .then(function(response) {
            alert('メール通知を登録しました。');
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            alert('メール通知の登録に失敗しました。');
            console.log('FAILED...', error);
        });
    } else {
        alert('メールアドレスを入力してください。');
    }
});

// バスの位置情報ページに戻る
document.getElementById('backToMap').addEventListener('click', function() {
    window.location.href = 'index.html';
});
