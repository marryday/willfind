import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import "./ChatStyle.css";

export default () => {
  const address = document.location.href;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyDaW0bFssIk_RoDcPt1kpsR_BobFXT0tuQ",
      authDomain: "findme-59c24.firebaseapp.com",
      databaseURL: "https://findme-59c24.firebaseio.com",
      projectId: "findme-59c24",
      storageBucket: "findme-59c24.appspot.com",
      messagingSenderId: "667423176876",
      appId: "1:667423176876:web:68bc69f60dab12c3bf4709",
    };

    firebase.initializeApp(firebaseConfig);
    getMessages();
  }, []);

  useEffect(() => {
    ref.current && ref.current.scrollIntoView();
    console.log(ref);
  }, [messages]);

  //   const storageRef = firebase.storage().ref();
  //   const imagesRef = storageRef.child('images');
  //   const fileName = 'space.jpg'
  //   const imageRef = imagesRef.child(fileName)
  // const path = imageRef.fullPath
  // const name = imageRef.name;

  const getMessages = () => {
    let messagesDB = firebase.database().ref(`${address}`);
    messagesDB.on("value", (snapshot) => {
      let newMessages = [];
      snapshot.forEach((child) => {
        let message = child.val();
        newMessages.push({
          id: child.key,
          text: message.text,
          user: message.me,
        });
      });
      setMessages(newMessages);
    });
  };

  const writeMessageToDb = (message) => {
    firebase.database().ref(`${address}`).push({
      text: message,
      user: "me",
    });
  };

  return (
    <div className="chat">
        {messages.map((message) => (
          <p className="paragraph" key={message.id} ref={ref}>
            {message.text}
          </p>
        ))}
      <div className="inputChat">
        <TextField
          placeholder="Type something..."
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          onKeyPress={(e) => {  
            if (e.charCode === 13 && input.trim() !== "") {
              setMessages([...messages, input]);
              writeMessageToDb(input);
              setInput("");
            }
          }}
        ></TextField>
        <Send
          onClick={() => {
            if (input.trim() !== "") {
              setMessages([...messages, input]);
              writeMessageToDb(input);
              setInput("");
            }
          }}
        />
      </div>
    </div>
  );
};
