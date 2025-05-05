console.log("surf.js загружен");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCgmPqdrQy-A68EULCW8PAK8NKWpgwYEA4",
  authDomain: "autosurfzone-b0f2e.firebaseapp.com",
  projectId: "autosurfzone-b0f2e",
  storageBucket: "autosurfzone-b0f2e.appspot.com",
  messagingSenderId: "787957968303",
  appId: "1:787957968303:web:17461efc4e06ae5c5c135a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Список рекламных ссылок
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
let uid = null;

const adFrame = document.getElementById("adFrame");
const timer = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");

function startAdTimer() {
  let timeLeft = 15;
  timer.textContent = `Подождите: ${timeLeft} сек`;
  nextBtn.disabled = true;

  const interval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Подождите: ${timeLeft} сек`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      timer.textContent = "Можно переходить дальше!";
      nextBtn.disabled = false;
    }
  }, 1000);
}

function loadAd() {
  adFrame.src = adUrls[currentIndex];
  startAdTimer();
}

nextBtn.addEventListener("click", async () => {
  if (uid) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      views: increment(1),
      earnings: increment(0.0002) // награда в LTC
    });
  }

  currentIndex = (currentIndex + 1) % adUrls.length;
  loadAd();
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    loadAd();
  } else {
    window.location.href = "auth.html";
  }
});
