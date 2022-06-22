import React from "react";
import io from "socket.io-client";

export default function ChatBox(props) {
  return (
    <div>
      <input type="text" placeholder="Message ..." />
      <button>Envoyer</button>
    </div>
  );
}
