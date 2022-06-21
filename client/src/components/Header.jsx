import React from "react";
import "./style/header.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header id="header">
      <button
        id="disconnect"
        onClick={() => {
          dispatch("LOGOUT");
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Disconnect
      </button>
    </header>
  );
}
