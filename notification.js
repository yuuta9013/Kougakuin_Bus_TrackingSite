<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>通知オプション</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>通知オプション</h1>
    <div>
        <label for="busStopSelect">バス停を選択:</label>
        <select id="busStopSelect">
            <option value="0">八王子駅行き</option>
            <option value="1">みなみ野駅行き</option>
            <option value="2">学校行き(みなみ野)</option>
            <option value="3">学校行き(八王子)</option>
        </select>
    </div>
    <div>
        <label for="email">メールアドレス:</label>
        <input type="email" id="email" placeholder="メールアドレスを入力">
        <button id="register">登録</button>
    </div>
    <button id="backToMap">戻る</button>
    <script src="notification.js"></script>
</body>
</html>
