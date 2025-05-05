import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { db } from './firebase-config.js';

onAuthStateChanged(auth, async user => {
  if (!user) {
    // Пользователь не вошёл — перекидываем на страницу входа
    window.location.href = 'auth.html';
  } else {
    // Пользователь авторизован — загружаем данные
    await loadUserData(user.uid, user.email);
  }
});

async function loadUserData(uid, email) {
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("userName").textContent = email;
      document.getElementById("userBalance").textContent = data.earnings.toFixed(2);
      document.getElementById("refLink").textContent = `https://autosurfzone.biz/?ref=${uid}`;
    } else {
      console.error("Нет данных о пользователе в базе");
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных пользователя:", error);
  }
}
