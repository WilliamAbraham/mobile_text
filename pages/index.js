import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../.utils/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, limit } from "firebase/firestore";

function Chat() {
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(messagesQuery, { idField: "id" });
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    if (newMessage) {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messagesContainer}>
        {messages &&
          messages.map((message) => (
            <div key={message.id} style={styles.message}>{message.text}</div>
          ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={styles.input}
      />
      <button onClick={sendMessage} style={styles.sendButton}>
        Send
      </button>
    </div>
  );
}

export default Chat;

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  message: {
    background: "#007bff",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "10px",
    fontSize: "16px",
  },
  sendButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};
