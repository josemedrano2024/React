// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm6n7ZqAPl_QaYSVE8nsJ9fKMUCGIgsfs",
  authDomain: "ubicate-d4856.firebaseapp.com",
  projectId: "ubicate-d4856",
  storageBucket: "ubicate-d4856.firebasestorage.app",
  messagingSenderId: "1049935204935",
  appId: "1:1049935204935:web:5397f73293ca15f3bad762",
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// ✅ Exporta db
export { db };
