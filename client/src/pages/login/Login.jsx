import React from "react";
import "./login.css";
import logo from "../../assets/everping_logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div id="login">
      <form id="form-login" onSubmit={handleLogin}>
        <div id="logo-login">
          <img id="img-login" src={logo} alt="Logo de Everping" />
        </div>
        <h1 id="h1-login">Login to Everping App</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Connexion</button>
      </form>
      <p>
        Vous n'avez pas de compte ?{" "}
        <span id="span-login" onClick={() => navigate("/register")}>
          Créer un compte
        </span>
      </p>
    </div>
  );
}
