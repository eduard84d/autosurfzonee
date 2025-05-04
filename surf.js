
const ads = [
  "https://antautosurf.com/?ref=29085",
  "https://faucetpay.io/?r=2738792",
  "https://rollercoin.com/?r=kndi047d"
  "https://socpublic.com/?i=9480820&slide=1",
  "https://bitsbon.com/?ref=5148",
  "https://payeer.com/?session=12482302",
  "https://viefaucet.com?r=61e83d735cc8356fa4bded97",
  "https://www.binance.com/referral/earn-together/refertoearn2000usdc/claim?hl=ru&ref=GRO_14352_KKBV3&utm_medium=web_share_copy&utm_source=referralmode",
  
];

let index = 0;
function loadNextAd() {
  index = (index + 1) % ads.length;
  document.getElementById("adFrame").src = ads[index];
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.getElementById("status").textContent = "Откройте вкладку для продолжения";
  } else {
    document.getElementById("status").textContent = "Просматривайте сайт...";
  }
});
