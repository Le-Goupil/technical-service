import React from "react";
import "./login.css";
import logo from "../../assets/everping_logo.png";

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div id="login">
      <form onSubmit={handleLogin}>
        <div id="logo">
          <img src={logo} alt="Logo de Everping" />
        </div>
        <h1>Login to Everping App</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Connexion</button>
      </form>
      <p>
        Vous n'avez pas de compte ? <span>Créer un compte</span>
      </p>
    </div>
  );
}
