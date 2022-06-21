import React from "react";
import "./style/sidebar.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      {!props.user.technicien ? (
        <button onClick={() => props.setOpenTicket(true)}>
          Creer un ticket
        </button>
      ) : null}
    </div>
  );
}
