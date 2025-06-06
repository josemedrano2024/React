import { useState, useEffect } from "react";
import { db } from "./firebase.js"; // Ajusta la ruta según tu estructura
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function UbicateTest() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");

  // Leer datos de la colección "ubicate"
  useEffect(() => {
    const fetchLocations = async () => {
      const querySnapshot = await getDocs(collection(db, "ubicate"));
      const locationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(locationsData);
    };
    fetchLocations();
  }, []);

  // Guardar un nuevo dato en "ubicate"
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLocation.trim()) return;

    await addDoc(collection(db, "ubicate"), {
      name: newLocation,
      createdAt: serverTimestamp(), // Usa la marca de tiempo de Firebase
    });
    setNewLocation("");
    alert("¡Ubicación guardada!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Base de datos: "ubicate"</h2>

      {/* Formulario para agregar ubicaciones */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Nombre de la ubicación"
        />
        <button type="submit">Guardar</button>
      </form>

      {/* Lista de ubicaciones */}
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            <strong>{loc.name}</strong> - {loc.createdAt?.toDate().toString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UbicateTest;
