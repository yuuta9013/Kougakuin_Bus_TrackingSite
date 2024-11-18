document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    if (menu.style.display === "block") {
      menu.style.display = "none"; // メニューを収納
    } else {
      menu.style.display = "block"; // メニューを展開
    }
  });

  // メニュー外をクリックした際の非表示処理
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
      menu.style.display = "none";
    }
  });
});
