import React from "react";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SOCKET_IO_URL);

export default function ChatBox(props) {
  const sendMessage = () => {};

  return (
    <div>
      <input type="text" placeholder="Message ..." />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}
