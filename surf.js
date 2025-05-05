import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

const ads = [
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

let uid = null;
let currentIndex = 0;

const status = document.getElementById("status");
const btn = document.getElementById("startAd");

btn.addEventListener("click", () => {
  const adUrl = ads[currentIndex];
  const adWindow = window.open(adUrl, "_blank");

  status.textContent = "Ожидаем 15 секунд...";
  btn.disabled = true;

  const timer = setTimeout(async () => {
    if (!adWindow.closed) {
      adWindow.close();
      if (uid) {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
          views: increment(1),
          earnings: increment(0.001) // Можно увеличить, если надо
        });
      }
      status.textContent = "Зачтено! Можно смотреть следующую рекламу.";
      currentIndex = (currentIndex + 1) % ads.length;
    } else {
      status.textContent = "Вы закрыли вкладку слишком рано.";
    }
    btn.disabled = false;
  }, 15000);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    status.textContent = "Нажмите кнопку для просмотра рекламы.";
  } else {
    window.location.href = "auth.html";
  }
});

