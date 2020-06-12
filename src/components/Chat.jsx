import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase";

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

    // Initialize Firebase

    firebase.initializeApp(firebaseConfig);
    getMessages();
  }, []);

  useEffect(() => {
    const container = document.getElementById("chatview-container");
    window.scrollTo(0, container.scrollHeight);
    console.log('123')
  });

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
  const styleInput = {
    position: "fixed",
    left: "0",
    bottom: "0",
    padding: "10",
  };
  const styleButton = {
      position: "fixed",
      left: '200px',
      bottom: "0",
      padding: "10",
    };
  
  // const [input, setInput] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [container, setContainer] = useState(document.getElementById('chatview-container'))
  // if(container) setContainer(document.getElementById('chatview-container').scrollTo(0, container.scrollHeight))
  return (
    <div className="chat" id="chatview-container">
      {messages.map((message) => (
        <p key={message.id}> {message.text}</p>
      ))}
      <input
        placeholder="Type something..."
        onChange={(e) => setInput(e.target.value)}
        type="text"
        value={input}
        style={styleInput}
        onKeyPress={(e) => {
          if (e.charCode === 13 && input.trim() !== "") {
            setMessages([...messages, input]);
            writeMessageToDb(input);
            setInput("");
          }
        }}
      ></input>
      <input
        style={styleButton}
        type="file"
        name="myFile"
        onSubmit={(file) => console.log(file.filename())}
      />
    </div>
  );
};
