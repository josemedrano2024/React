// Importa la configuración de Firebase
import { db } from "./firebase.js";
import { doc, setDoc } from "firebase/firestore";

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
      fechaRegistro: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "ubicate", "Negocios"), businessData);
      alert("✅ Negocio registrado correctamente");
      document.getElementById("businessForm").reset();
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      alert("Hubo un error al registrar el negocio");
    }
  });
