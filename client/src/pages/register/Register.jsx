import React from "react";
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../../assets/everping_logo.png";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === passwordVerif) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .then(() => setConfirmation("Votre compte à bien été créé"))
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      setError("Password don't match");
    }
  };

  return (
    <div id="register">
      <form id="form-register" onSubmit={handleRegister}>
        <div id="logo-register">
          <img id="img-register" src={logo} alt="Logo de Everping" />
        </div>
        <h1 id="h1-register">Register an account to Everping App</h1>
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
        <input
          type="password"
          placeholder="Password verification"
          onChange={(e) => setPasswordVerif(e.target.value)}
        />
        <button type="submit">Connexion</button>
      </form>
      <p>
        Vous avez déjà un compte ?{" "}
        <span id="span-register" onClick={() => navigate("/login")}>
          Connectez-vous
        </span>
      </p>
    </div>
  );
}
