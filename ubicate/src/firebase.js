// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  GeoPoint,
} from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm6n7ZqAPl_QaYSVE8nsJ9fKMUCGIgsfs",
  authDomain: "ubicate-d4856.firebaseapp.com",
  projectId: "ubicate-d4856",
  storageBucket: "ubicate-d4856.firebasestorage.app",
  messagingSenderId: "1049935204935",
  appId: "1:1049935204935:web:5397f73293ca15f3bad762",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const guardarNegocio = async (datosNegocio) => {
  try {
    // Autenticación anónima si no hay usuario
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }

    // Guardar en la subcolección "registros" dentro de "ubicate/negocios"
    const docRef = await addDoc(
      collection(db, "ubicate", "negocios", "registros"),
      {
        ...datosNegocio,
        fechaRegistro: serverTimestamp(),
        ubicacion: new GeoPoint(datosNegocio.lat, datosNegocio.lng),
        usuarioId: auth.currentUser?.uid || "anonimo",
      }
    );

    console.log("Documento guardado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar:", error);
    throw error;
  }
};

export { db, auth };
