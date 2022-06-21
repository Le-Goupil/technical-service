import React from "react";
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../../assets/everping_logo.png";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerif, setPasswordVerif] = useState("");
  const [error, setError] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (usernameRequirement(username)) {
      setError("");
      if (password === passwordVerif) {
        setError("");
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            addUserToDb(user);
          })
          .then(() => {
            setConfirmation("Votre compte à bien été créé");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
          });
      } else {
        setError("Password don't match");
      }
    } else {
      setError("Username incorrect");
    }
  };

  const addUserToDb = async (data) => {
    await setDoc(doc(db, "user", data.uid), {
      admin: false,
      email: data.email,
      handleTicket: [],
      openTicket: [],
      technicien: false,
      username: username,
    });
  };

  const usernameRequirement = (username) => {
    return username.match(/^[a-z0-9_-]{3,15}$/);
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
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Inscription</button>
      </form>
      <p>
        Vous avez déjà un compte ?{" "}
        <span id="span-register" onClick={() => navigate("/login")}>
          Connectez-vous
        </span>
      </p>
      {error && <span id="error-register">{error}</span>}
      {confirmation && <span id="succes-register">{confirmation}</span>}
    </div>
  );
}
