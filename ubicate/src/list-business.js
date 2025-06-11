// src/list-business.js
import { db } from "./firebase.js";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const businessList = document.getElementById("business-list");

// Consulta ordenada por fecha
const q = query(
  collection(db, "ubicate", "Negocios", "registros"),
  orderBy("fechaRegistro", "desc")
);

// Escucha cambios en tiempo real
onSnapshot(q, (snapshot) => {
  businessList.innerHTML = ""; // Limpiar lista

  snapshot.forEach((doc) => {
    const business = doc.data();
    businessList.innerHTML += `
            <div class="business-card">
                <h3>${business.nombre}</h3>
                <p><strong>Dirección:</strong> ${business.direccion}</p>
                <p><strong>Teléfono:</strong> ${business.telefono}</p>
                <p><strong>Categoría:</strong> ${business.categoria}</p>
                <p><strong>Horario:</strong> ${business.horario}</p>
                <p><strong>Descripción:</strong> ${business.descripcion}</p>
            </div>
        `;
  });
});
