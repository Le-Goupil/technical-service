import React from "react";
import "./home.css";
import Spinner from "../../assets/Spinner.svg";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import { useState } from "react";
import TicketForm from "../../components/TicketForm";

export default function Home(props) {
  const [openTicket, setOpenTicket] = useState(false);
  console.log(openTicket);
  if (props.user === undefined) {
    return (
      <div id="home-spinner">
        <img id="spinner-img-home" src={Spinner} alt="Spinner" />
      </div>
    );
  } else {
    return (
      <div className="home">
        <div id="home-header">
          <Header user={props.user} />
        </div>
        <div id="home-body">
          <Sidebar user={props.user} setOpenTicket={setOpenTicket} />
          {openTicket && (
            <TicketForm setOpenTicket={setOpenTicket} user={props.user} />
          )}
        </div>
      </div>
    );
  }
}
