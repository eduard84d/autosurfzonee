// Скрипт автопереключения рекламы

// Ждём загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
  // Список партнёрских ссылок
  const links = [
    "https://antautosurf.com/?ref=29085",
    "https://faucetpay.io/?r=2738792",
    "https://socpublic.com/?i=9480820&slide=1",
    "https://bitsbon.com/?ref=5148",
    "https://payeer.com/?session=12482302",
    "https://rollercoin.com/?r=KNDI047D",
    "https://viefaucet.com?r=61e83d735cc8356fa4bded97",
    "https://www.coinpayu.com/?r=eduard85",
    "https://freebitco.in/?r=36730895"
  ];

  let currentIndex = 0;
  const iframe = document.getElementById('adFrame');

  if (!iframe) {
    console.error('iframe#adFrame не найден');
    return;
  }

  function showNextAd() {
    // Загрузка следующей рекламы
    iframe.src = links[currentIndex];
    console.log('Показ рекламы:', links[currentIndex]);
    currentIndex = (currentIndex + 1) % links.length;
  }

  // Показ первой рекламы сразу
  showNextAd();

  // Переключение рекламы каждые 20 секунд
  setInterval(showNextAd, 20000);
});

