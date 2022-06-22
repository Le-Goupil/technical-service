import React from "react";
import "./style/sidebar.css";
import { collection, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";

export default function Sidebar(props) {
  const [ticketRef, setTicketRef] = useState([]);
  const [ticketRoom, setTicketRoom] = useState();

  useEffect(() => {
    onSnapshot(doc(db, "user", props.user.id), (snapshot) => {
      const data = snapshot.data();
      setTicketRef([]);
      data.openTicket.map((e) => {
        getTicketData(e);
      });
    });

    const getTicketData = async (e) => {
      const ticket = await getDoc(e);
      if (ticket.data()) {
        setTicketRef((ticketRef) => [
          ...ticketRef,
          { data: ticket.data(), id: ticket.id },
        ]);
      }
    };
  }, []);

  return (
    <div className="sidebar">
      {!props.user.technicien && (
        <button onClick={() => props.setOpenTicket(true)}>
          Creer un ticket
        </button>
      )}

      <div className="chatbox-list">
        {ticketRef ? (
          ticketRef.map((e) => {
            return (
              <div
                className="chatbox"
                onClick={() => props.setOpenChatRoom(e.id)}
              >
                <h2>Sujet : {e.data.subject}</h2>
                {e.data.messages[e.data.messages.length - 1] ? (
                  <p>
                    Last message : {e.data.message[e.data.message.length - 1]}
                  </p>
                ) : (
                  <p>Il n'y a pas de message actuellement</p>
                )}
              </div>
            );
          })
        ) : (
          <h2>Vous n'avez pas de ticket ouvert en cours</h2>
        )}
      </div>
    </div>
  );
}
