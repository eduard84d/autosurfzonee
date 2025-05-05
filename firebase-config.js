// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgmPqdrQy-A68EULCW8PAK8NKWpgwYEA4",
  authDomain: "autosurfzone-b0f2e.firebaseapp.com",
  projectId: "autosurfzone-b0f2e",
  storageBucket: "autosurfzone-b0f2e.appspot.com",
  messagingSenderId: "787957968303",
  appId: "1:787957968303:web:17461efc4e06ae5c5c135a",
  measurementId: "G-T5QGRM80FF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
