
const ads = [
  "https://antautosurf.com/?ref=29085",
  "https://coinpayu.com/?r=eduard85",
  "https://faucetpay.io/?r=2738792",
  "https://rollercoin.com/?r=kndi047d"
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
