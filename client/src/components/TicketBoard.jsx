import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import Spinner from "../assets/Spinner.svg";

export default function TicketBoard(props) {
  const [ticketOpen, setTicketOpen] = useState();
  const [docId, setDocId] = useState();
  console.log(docId);
  useEffect(() => {
    const getTicketsOpen = async () => {
      const q = query(collection(db, "ticket"), where("technicien", "==", ""));
      const querySnapshot = await getDocs(q);
      setTicketOpen(querySnapshot.docs);
    };
    getTicketsOpen();
    if (docId) {
      setHandleTicketToDb();
      setDocId();
    }
  }, [docId]);

  const claimTicket = async (e) => {
    const technicienRef = doc(db, "user", props.user.id);
    const docRef = await getDoc(doc(db, "ticket", e.id));
    console.log(docRef.ref);
    if (docRef) {
      updateDoc(doc(db, "ticket", e.id), {
        technicien: {
          username: props.user.data.username,
          id: props.user.id,
        },
      });
      setDocId(docRef.ref);
    }
  };

  const setHandleTicketToDb = async () => {
    await updateDoc(doc(db, "user", props.user.id), {
      handleTicket: arrayUnion(docId),
    });
  };

  if (!ticketOpen) {
    return <img id="spinner-img-home" src={Spinner} alt="Spinner" />;
  } else {
    return (
      <div className="openticket-container">
        {ticketOpen.map((e) => {
          // console.log(e.data());
          return (
            <div className="openticket-card">
              <h2>{e.data().subject}</h2>
              <p>{e.data().description}</p>
              <p>By : {e.data().user.username}</p>
              <button onClick={() => claimTicket(e.data())}>
                Prendre le ticket
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
