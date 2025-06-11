import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Cargando...</div>;
  return user ? children : <Navigate to="/login" />;
};

// Uso en tu router:
<Route
  path="/admin"
  element={
    <PrivateRoute>
      <AdminPanel />
    </PrivateRoute>
  }
/>;
