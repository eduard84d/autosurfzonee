const adUrls = [
  "https://antautosurf.com/?ref=29085", // ← замени на свои реальные ссылки
  "https://faucetpay.io/?r=2738792",
  "https://socpublic.com/?i=9480820&slide=1",
  "https://coinpayu.com/?r=eduard85",
  "https://freebitco.in/?r=36730895",
  "https://bitsbon.com/?ref=5148",
  "https://payeer.com/?session=12482302",
  "https://rollercoin.com/?r=kndi047d",
  "https://viefaucet.com?r=61e83d735cc8356fa4bded97",
  "https://www.binance.com/referral/earn-together/refertoearn2000usdc/claim?hl=ru&ref=GRO_14352_KKBV3&utm_medium=web_share_copy&utm_source=referralmode",
];

let currentIndex = 0;

function showNextAd() {
  const iframe = document.getElementById("adFrame");
  if (iframe) {
    iframe.src = adUrls[currentIndex];
    currentIndex = (currentIndex + 1) % adUrls.length;
  }
}

// Показываем первую и запускаем таймер
showNextAd();
setInterval(showNextAd, 20000); // меняем каждые 20 секунд
