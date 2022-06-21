import React from "react";
import "./style/header.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  if (props.user) {
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
        {props.user.data.admin ? (
          <a className="panel-button" href="/admin">
            Admin Panel
          </a>
        ) : null}
        {props.user.data.technicien ? (
          <a href="/technicien" className="panel-button">
            Technicien Panel
          </a>
        ) : null}
      </header>
    );
  }
}
