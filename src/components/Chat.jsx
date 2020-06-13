import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import "./ChatStyle.css";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { firebaseConfig } from "../FirebaseConfig";

export default () => {
  const address = document.location.href;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    getMessages();
  }, []);

  useEffect(() => {
    ref.current && ref.current.scrollIntoView();
  }, [messages]);

  const getMessages = async () => {
    let messagesDB = firebase.database().ref(`${address}`);
    messagesDB.on("value", (snapshot) => {
      let newMessages = [];
      snapshot.forEach((child) => {
        let message = child.val();
        if (message.type === "text") {
          newMessages.push({
            id: child.key,
            text: message.text,
            user: message.me,
          });
        } else if (message.type === "file") {
          console.log(message.text)
          let url
           fetch('/upload/url', {
            method: 'POST',
            body: 'adad'
          }).then(response => response.json().then(result => url = result ));

          newMessages.push({
            id: child.key,
            url: `${message.text}`,
            user: message.me,
          });
        }
      });
      setMessages(newMessages);
    });
  };

  const writeMessageToDb = (message, type) => {
    firebase.database().ref(`${address}`).push({
      text: message,
      user: "me",
      type: type,
    });
  };

  const uploadFile = async (event) => {
    
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    try{
      const res = await (await fetch('/upload', {
        method: 'POST',
        body: formData
      })).json()
      writeMessageToDb(res.filePath, "file")
    }catch(e){

    }
  }

  return (
    <div className="chat">
      {messages.map((message) =>
        message.text ? (
          <p key={message.id} ref={ref}>
            {message.text}
          </p>
        ) : (
          <img src={process.env.PUBLIC_URL + "uploads/Screenshot_1.png"} />
        )
      )}
      <div className="inputChat">
        <TextField  
          placeholder="Type something..."
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          onKeyPress={(e) => {
            if (e.charCode === 13 && input.trim() !== "") {
              setMessages([...messages, input]);
              writeMessageToDb(input, "text");
              setInput("");
            }
          }}
        ></TextField>
        <Send
          onClick={() => {
            if (input.trim() !== "") {
              setMessages([...messages, input]);
              writeMessageToDb(input, "text");
              setInput("");
            }
          }}
          className="sendBtn"
        />
        <input
          style={{ display: "none" }}
          type="file"
          id="icon-button-file"
          onChange={(event) => uploadFile(event)
          }
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </div>
    </div>
  );
};
