const symbols = ["🍒", "🍋", "🍉", "⭐", "🍇", "🍎", "🍊", "🍈"];
const initialSymbols = "🍒🍋🍉⭐🍇🍎🍊🍈🍒";

let isSpinning = [false, false, false];

function startSpin() {
  for (let i = 1; i <= 3; i++) {
    const reel = document.getElementById(`reel${i}`);　
    reel.classList.add("spinning");
    document.getElementById(`stop${i}`).disabled = false;
    isSpinning[i - 1] = true;
    reel.querySelector(".reel-content").textContent = initialSymbols;
  }
  document.getElementById("result").textContent = "";
}

function stopReel(reelNumber) {
  const reel = document.getElementById(`reel${reelNumber}`);
  reel.classList.remove("spinning");
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  reel.querySelector(".reel-content").textContent = randomSymbol;

  document.getElementById(`stop${reelNumber}`).disabled = true;
  isSpinning[reelNumber - 1] = false;

  if (isSpinning.every(spin => spin === false)) {
    checkResult();
  }
}

function checkResult() {
  const reel1Symbol = document.getElementById("reel1").querySelector(".reel-content").textContent;
  const reel2Symbol = document.getElementById("reel2").querySelector(".reel-content").textContent;
  const reel3Symbol = document.getElementById("reel3").querySelector(".reel-content").textContent;
  const result = document.getElementById("result");

  if (reel1Symbol === reel2Symbol && reel2Symbol === reel3Symbol) {
    result.textContent = "おめでとう！ ジャックポット！";
  } else {
    result.textContent = "残念！";
  }
}
