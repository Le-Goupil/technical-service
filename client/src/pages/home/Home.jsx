import React from "react";
import { useState } from "react";
import "./home.css";
import Spinner from "../../assets/Spinner.svg";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import TicketForm from "../../components/TicketForm";
import ChatBox from "../../components/ChatBox";

export default function Home(props) {
  const [openTicket, setOpenTicket] = useState(false);
  const [openChatRoom, setOpenChatRoom] = useState();

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
          <Sidebar
            user={props.user}
            setOpenTicket={setOpenTicket}
            setOpenChatRoom={setOpenChatRoom}
          />
          {openTicket && (
            <TicketForm setOpenTicket={setOpenTicket} user={props.user} />
          )}
          {openChatRoom && (
            <ChatBox setOpenChatRoom={setOpenChatRoom} user={props.user} />
          )}
        </div>
      </div>
    );
  }
}
