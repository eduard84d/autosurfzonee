import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, updateDoc, increment, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
const db   = getFirestore(app);

const links = [
  "https://antautosurf.com/?ref=29085",
  "https://faucetpay.io/?r=2738792",
  "https://socpublic.com/?i=9480820&slide=1",
  "https://bitsbon.com/?ref=5148",
  "https://payeer.com/?session=12482302",
  "https://rollercoin.com/?r=kndi047d",
  "https://viefaucet.com?r=61e83d735cc8356fa4bded97",
  "https://www.coinpayu.com/?r=eduard85",
  "https://freebitco.in/?r=36730895"
];

const REWARD = 0.001;      // LTC за показ
const MIN_WITHDRAW = 0.01; // минималка для вывода

let currentIndex = 0;
let uid = null;

// UI элементы
const iframe     = document.getElementById("adFrame");
const timerEl    = document.getElementById("count");
const nextBtn    = document.getElementById("nextBtn");
const balanceEl  = document.getElementById("balance");
const withdrawBtn= document.getElementById("withdrawBtn");

function updateBalanceUI(value) {
  balanceEl.textContent = `Ваш баланс: ${value.toFixed(3)} LTC`;
  withdrawBtn.disabled = value < MIN_WITHDRAW;
}

// обновляем баланс с Firebase
async function loadBalance() {
  if (!uid) return;
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  const bal = snap.exists() ? snap.data().earnings : 0;
  console.log(`Баланс пользователя: ${bal}`);
  updateBalanceUI(bal);
}

// показываем рекламу и запускаем таймер
function loadAd() {
  console.log(`Загружаем рекламу на ссылке: ${links[currentIndex]}`);
  iframe.src = links[currentIndex];
  nextBtn.disabled = true;
  let timeLeft = 15;
  timerEl.textContent = timeLeft;

  const t = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(t);
      nextBtn.disabled = false;
    }
  }, 1000);
}

// при клике «Следующая реклама»
nextBtn.addEventListener("click", async () => {
  console.log("Реклама просмотрена, начисляем награду...");
  // начисляем награду
  if (uid) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      views: increment(1),
      earnings: increment(REWARD)
    });
    await loadBalance();
  }
  // переключаем
  currentIndex = (currentIndex + 1) % links.length;
  loadAd();
});

// при клике «Вывести средства»
withdrawBtn.addEventListener("click", () => {
  alert("Заявка на вывод отправлена!"); 
  // здесь можно отправлять в Telegram или обрабатывать запрос
});

onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "auth.html";
  } else {
    uid = user.uid;
    console.log(`Пользователь авторизован: ${uid}`);
    await loadBalance();
    loadAd();
  }
});

