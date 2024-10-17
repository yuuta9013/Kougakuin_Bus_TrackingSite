// メニューボタンの表示/非表示を切り替える関数
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
               menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// お知らせデータの表示（動的にお知らせを更新したい場合に使用可能）
const notifications = [
    { date: '2024-10-01', message: 'バス運行に遅延があります。' },
    { date: '2024-10-05', message: '工事のため、一部ルートが変更されました。' },
    { date: '2024-10-10', message: '新しいバス停が追加されました。' }
];

const notificationDiv = document.getElementById('notifications');

// お知らせがある場合、それをリスト表示
if (notifications.length > 0) {
    notificationDiv.innerHTML = ''; // デフォルトメッセージをクリア
    notifications.forEach(notification => {
        const notificationItem = document.createElement('p');
        notificationItem.textContent = `${notification.date}: ${notification.message}`;
        notificationDiv.appendChild(notificationItem);
    });
} else {
    notificationDiv.textContent = '特にありません。';
}

