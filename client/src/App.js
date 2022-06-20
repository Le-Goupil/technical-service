import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect } from "react";

function App() {
  const [isTechnicien, setIsTechnicien] = useState();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserType = async (user) => {
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userRef = docSnap.data();
        if (userRef.technicien) {
          setIsTechnicien(true);
        } else {
          setIsTechnicien(false);
        }
      }
    };
    fetchUserType(currentUser);
  }, [currentUser]);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            index
            element={
              <RequireAuth>
                <Home isTechnicien={isTechnicien} />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
