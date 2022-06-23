import React from "react";
import { useState } from "react";
import {
  setDoc,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  query,
  onSnapshot,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { useRef } from "react";

export default function ChatBox(props) {
  const [message, setMessage] = useState();
  const [displayMessages, setDisplayMessages] = useState();
  const [status, setStatus] = useState();
  const [currentDoc, setCurrentDoc] = useState();
  const [currentDocRef, setCurrentDocRef] = useState();
  const [docRefForSurvey, setDocRefForSurvey] = useState();
  const [docRefForNewTicket, setRefForNewTicket] = useState();
  const scrollTo = useRef();

  const executeScroll = () => scrollTo.current.scrollIntoView();

  useEffect(() => {
    const q = query(doc(db, "ticket", props.roomId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      setStatus(querySnapshot.data().status);
      querySnapshot.data().messages.forEach((doc) => {
        messages.push({
          sendTime: doc.sendTime,
          username: doc.username,
          message: doc.message,
        });
      });
      setDisplayMessages(messages);
    });

    const getDataFromDoc = async (doc) => {
      const document = await getDoc(doc);
      if (document.data()) {
        setCurrentDoc(document.data());
      }
    };
    getDataFromDoc(q);

    if (docRefForSurvey) {
      updateDoc(currentDocRef, {
        survey: docRefForSurvey,
      });
    }
  }, [props.roomId]);

  setTimeout(() => {
    executeScroll();
  }, 100);

  const sendMessage = async (e) => {
    e.preventDefault();
    addMessageToDb();
    executeScroll();
    e.target.reset();
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

  const closeTicket = async () => {
    await updateDoc(doc(db, "ticket", props.roomId), {
      status: false,
      closingData: serverTimestamp(),
    });

    const docRef = await addDoc(
      collection(db, "survey", {
        user: currentDoc.user,
        technicien: currentDoc.technicien,
        note: null,
        commentaire: "",
        ticket: currentDocRef,
        answer: false,
      })
    );

    if (docRef) {
      setDocRefForSurvey(docRef);
    }
  };

  // console.log(docRefForNewTicket);
  // if (docRefForNewTicket) {
  //   updateDoc(
  //     doc(db, "user", currentDoc.technicien.id, {
  //       handleTicket: arrayUnion(docRefForNewTicket),
  //     })
  //   );
  // }

  const openNewTicket = async (e) => {
    updateDoc(doc(db, "ticket", props.roomId), {
      status: false,
      closingData: serverTimestamp(),
    });
    const sujet = prompt("Quel est le sujet ?");
    const collectionRef = collection(db, "ticket");
    const docRef = await addDoc(collectionRef, {
      user: currentDoc.user,
      creatingDate: serverTimestamp(),
      subject: sujet,
      description: e.target.parentNode.children[1].textContent,
      messages: [],
      previousTicket: currentDocRef,
      status: true,
      technicien: currentDoc.technicien,
      survey: {},
      previousTicket: {},
    });
    setRefForNewTicket(docRef);
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
                {props.user.data.technicien && (
                  <>
                    <button onClick={(e) => openNewTicket(e)}>
                      Ouvrir un nouveau ticket sur ce message
                    </button>
                    <button onClick={() => closeTicket()}>
                      Fermer la conversation sur ce message
                    </button>
                  </>
                )}
              </div>
            );
          })}
      </div>
      <form onSubmit={sendMessage}>
        <div ref={scrollTo}></div>
        <input
          type="text"
          placeholder="Message ..."
          onChange={(e) => setMessage(e.target.value)}
          disabled={!status}
        />
        <button type="submit" id="send-message">
          Envoyer
        </button>
      </form>
    </div>
  );
}
