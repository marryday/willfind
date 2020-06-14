import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import "./ChatStyle.css";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { firebaseConfig } from "../FirebaseConfig";
import { FormHelperText } from "@material-ui/core";
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
            user: message.user,
          });
        } else if (message.type === "file") {
          console.log(message.text);
          // let url
          //  fetch('/upload/url', {
          //   method: 'POST',
          //   body: 'adad'
          // }).then(response => response.json().then(result => url = result ));

          newMessages.push({
            id: child.key,
            url: message.text,
            user: message.user,
          });
        }
      });
      setMessages(newMessages);
    });
  };

  const writeMessageToDb = (message, type) => {
    firebase
      .database()
      .ref(`${address}`)
      .push({
        text: message,
        user: localStorage.getItem("userName"),
        type: type,
      });
  };

  const uploadPhoto = (event) => {
    const file = event.target.files[0];
    const uploadTask = firebase.storage().ref(`/images/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () =>
        firebase
          .storage()
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            writeMessageToDb(firebaseUrl, "file");
          })
    );
  };

  return (
    <div className="chat">
      {messages.map((message) =>
        message.text ? (
          <>
            <FormHelperText>{message.user}</FormHelperText>
            <p key={message.id} ref={ref}>
              {message.text}
            </p>
          </>
        ) : (
          <>
            <FormHelperText>{message.user}</FormHelperText>
            <img
              src={process.env.PUBLIC_URL + `${message.url}`}
              style={{ maxWidth: "300px" }}
            />
          </>
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
          onChange={(event) => uploadPhoto(event)}
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
