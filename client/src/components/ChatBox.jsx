import React from "react";
import { useState } from "react";
import {
  setDoc,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

export default function ChatBox(props) {
  const [message, setMessage] = useState();
  const [displayMessages, setDisplayMessages] = useState();

  useEffect(() => {
    getMessages();
  }, [props.sendMessage]);

  const sendMessage = async (e) => {
    e.preventDefault();
    addMessageToDb();
    props.setSendMessage(Math.random());
  };

  const addMessageToDb = async () => {
    const ticketRef = doc(db, "ticket", props.roomId);
    await updateDoc(ticketRef, {
      messages: arrayUnion({
        username: props.user.data.username,
        message: message,
        sendTime: Timestamp.now(),
      }),
    });
  };

  const getMessages = async () => {
    const ref = await getDoc(doc(db, "ticket", props.roomId));
    if (ref.data()) {
      setDisplayMessages(ref.data().messages);
    }
  };

  return (
    <div className="chat">
      <div className="message-container">
        {displayMessages &&
          displayMessages.map((e) => {
            return (
              <div>
                <h2>{e.username} : </h2>
                <p>{e.message}</p>
                {/* <p className="time">{e.sendTime}</p> */}
              </div>
            );
          })}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Message ..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" id="send-message">
          Envoyer
        </button>
      </form>
    </div>
  );
}
