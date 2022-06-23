import React from "react";
import "./style/ticketForm.css";
import {
  doc,
  serverTimestamp,
  addDoc,
  updateDoc,
  arrayUnion,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";

export default function TicketForm(props) {
  const [sujet, setSujet] = useState();
  const [description, setDescription] = useState();
  const [confirmation, setConfirmation] = useState();
  const [docId, setDocId] = useState();

  useEffect(() => {
    if (docId) {
      addTicketToUserDb(docId);
      updateFreshTicket();
      setDocId();
    }
  }, [docId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sujet && description) {
      addTicketToDb();
      e.target.reset();
      setConfirmation("Votre ticket a bien été envoyé");
      setTimeout(() => {
        props.setOpenTicket(false);
      }, 3000);
    }
  };

  const addTicketToDb = async () => {
    const collectionRef = collection(db, "ticket");
    const docRef = await addDoc(collectionRef, {
      user: { id: props.user.id, username: props.user.data.username },
      creatingDate: serverTimestamp(),
      subject: sujet,
      description: description,
      messages: [],
      status: true,
      technicien: "",
      survey: {},
      previousTicket: {},
    });
    setDocId(docRef);
  };

  const addTicketToUserDb = async () => {
    const userRef = doc(db, "user", props.user.id);
    await updateDoc(userRef, {
      openTicket: arrayUnion(docId),
    });
  };

  const updateFreshTicket = async () => {
    await updateDoc(docId, {
      id: docId.id,
    });
  };

  if (!confirmation) {
    return (
      <>
        <p onClick={() => props.setOpenTicket(false)}>x</p>
        <h1>
          Remplissez le formulaire pour entrer en contact avec un technicien.
        </h1>
        <form id="ticket-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Sujet"
            onChange={(e) => setSujet(e.target.value)}
          />
          <input
            type="text"
            placeholder="Decrivez votre probleme"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Envoyez</button>
        </form>
      </>
    );
  } else {
    return <h1>{confirmation}</h1>;
  }
}
