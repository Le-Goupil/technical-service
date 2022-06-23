import React from "react";
import "./style/sidebar.css";
import { doc, onSnapshot, getDoc, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";

export default function Sidebar(props) {
  const [ticketDisplay, setTicketDisplay] = useState([]);

  useEffect(() => {
    const q = query(doc(db, "user", props.user.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ticket = [];
      if (!props.user.data.technicien) {
        querySnapshot.data().openTicket.forEach((doc) => {
          const getTicketData = async () => {
            const dataFromTicket = await getDoc(doc);
            if (dataFromTicket.data()) {
              ticket.push({
                data: dataFromTicket.data(),
                id: dataFromTicket.data().id,
              });
              setTicketDisplay(ticket);
            }
          };
          getTicketData();
        });
      } else {
        querySnapshot.data().handleTicket.forEach((doc) => {
          const getTicketData = async () => {
            const dataFromTicket = await getDoc(doc);
            if (dataFromTicket.data()) {
              ticket.push({
                data: dataFromTicket.data(),
                id: dataFromTicket.data().id,
              });
              setTicketDisplay(ticket);
            }
          };
          getTicketData();
        });
      }
    });
  }, []);

  const renderProperMessage = (message) => {
    return message.length > 20 ? message.slice(0, 20) + "..." : message;
  };

  const renderLastIndex = (array) => {
    return array[array.length - 1];
  };

  const renderCorrectButton = () => {
    return props.user.data.technicien ? (
      <button
        onClick={() => {
          props.setRoomId();
          props.setTicketBoard(true);
        }}
      >
        Montrer les tickets ouvert
      </button>
    ) : (
      <button
        onClick={() => {
          props.setRoomId();
          props.setOpenTicket(true);
        }}
      >
        Creer un ticket
      </button>
    );
  };

  return (
    <div className="sidebar">
      {renderCorrectButton()}
      <div className="chatbox-list">
        {ticketDisplay ? (
          ticketDisplay.map((e) => {
            return (
              <div
                className="chatbox"
                onClick={() => {
                  props.setRoomId(e.id);
                  props.setTicketBoard(false);
                  props.setOpenTicket(false);
                }}
              >
                <h2>Sujet : {e.data.subject}</h2>
                {renderLastIndex(e.data.messages) ? (
                  <p>
                    Dernier message : <br />
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
