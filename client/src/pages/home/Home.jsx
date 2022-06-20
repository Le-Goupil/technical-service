import React from "react";
import Spinner from "../../assets/Spinner.svg";
import "./home.css";
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
    return <TechnicienHome />;
  } else {
    return <ClientHome />;
  }
}
