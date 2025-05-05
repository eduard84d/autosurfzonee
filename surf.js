const adUrls = [
  "https://antautosurf.com/?ref=29085",
  "https://faucetpay.io/?r=2738792",
  "https://socpublic.com/?i=9480820&slide=1",
  "https://bitsbon.com/?ref=5148",
  "https://payeer.com/?session=12482302",
  "https://rollercoin.com/?r=kndi047d",
  "https://viefaucet.com?r=61e83d735cc8356fa4bded97",
  "https://www.coinpayu.com/?r=eduard85",
  "https://www.binance.com/referral/earn-together/refertoearn2000usdc/claim?hl=ru&ref=GRO_14352_KKBV3",
  "https://freebitco.in/?r=36730895"
];

let currentIndex = 0;
let timerInterval = null;
const adFrame = document.getElementById("adFrame");
const timer = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");

function startAdTimer() {
  let timeLeft = 15;
  timer.textContent = `Подождите: ${timeLeft} сек`;
  nextBtn.disabled = true;

  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Подождите: ${timeLeft} сек`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timer.textContent = "Можно переходить дальше!";
      nextBtn.disabled = false;
    }
  }, 1000);
}

function loadAd() {
  if (adFrame) {
    adFrame.src = adUrls[currentIndex];
    console.log("Показ рекламы:", adUrls[currentIndex]);
    startAdTimer();
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % adUrls.length;
  loadAd();
});

// Инициализация: показать первую рекламу
loadAd();
