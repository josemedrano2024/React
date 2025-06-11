import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};

// Botón en tu componente:
<button onClick={handleGoogleLogin}>Iniciar con Google</button>;
