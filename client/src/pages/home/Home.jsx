import React from "react";
import "./home.css";
import Spinner from "../../assets/Spinner.svg";
import ClientHome from "../../components/ClientHome";
import TechnicienHome from "../../components/TechnicienHome";

export default function Home(props) {
  if (props.isTechnicien === undefined) {
    return (
      <div id="home-spinner">
        <img id="spinner-img-home" src={Spinner} alt="Spinner" />
      </div>
    );
  } else if (props.isTechnicien) {
    return <TechnicienHome currentUser={props.currentUser} />;
  } else {
    return <ClientHome currentUser={props.currentUser} />;
  }
}
