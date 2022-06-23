import React from "react";
import "./style/sidebar.css";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
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
  }, [props.sendMessage]);

  const renderProperMessage = (message) => {
    return message.length > 20 ? message.slice(0, 20) + "..." : message;
  };

  const renderLastIndex = (array) => {
    return array[array.length - 1];
  };

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
              <div className="chatbox" onClick={() => props.setRoomId(e.id)}>
                <h2>Sujet : {e.data.subject}</h2>
                {renderLastIndex(e.data.messages) ? (
                  <p>
                    Dernier message <br />
                    {renderLastIndex(e.data.messages).username} :{" "}
                    {renderProperMessage(
                      renderLastIndex(e.data.messages).message
                    )}
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
