// src/save-business.js
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

document
  .getElementById("businessForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const businessData = {
      nombre: document.getElementById("nombre").value,
      direccion: document.getElementById("direccion").value,
      telefono: document.getElementById("telefono").value,
      categoria: document.getElementById("categoria").value,
      horario: document.getElementById("horario").value || "No especificado",
      descripcion:
        document.getElementById("descripcion").value || "Sin descripción",
      fechaRegistro: serverTimestamp(),
    };

    try {
      await addDoc(
        collection(db, "ubicate", "Negocios", "registros"),
        businessData
      );
      alert("✅ Negocio registrado correctamente");
      document.getElementById("businessForm").reset();
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      alert("Hubo un error al registrar el negocio");
    }
  });
