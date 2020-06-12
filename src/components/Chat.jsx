import React, { useEffect, useState } from "react";
import firebase from "firebase";

export default () =>  {
  const address = document.location.href;
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


//   const storageRef = firebase.storage().ref();
//   const imagesRef = storageRef.child('images');
//   const fileName = 'space.jpg'
//   const imageRef = imagesRef.child(fileName)
// const path = imageRef.fullPath
// const name = imageRef.name;


  const getMessages = () => {
    let messagesDB = firebase.database().ref(`${address}1messages2/`);
    messagesDB.on("value", (snapshot) => {
      let newMessages = [];
      snapshot.forEach((child) => {
        let message = child.val();
        newMessages.push({ id: child.key, text: message.text, user: message.me });
      });
      setMessages(newMessages);
    });
  };

  const writeMessageToDb = (message) => {
    firebase.database().ref(`${address}1messages2/`).push({
      text: message,
      user: 'me'
    });
  };

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div className="App">
      <input
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
      ></input>
      <label>Choose file to upload</label>
      <input type="file" name="myFile"  onSubmit={(file)=> console.log(file.filename())}/>
      {messages.map((message) => (
        <p key={message.id}> {message.text}</p>
      ))}
    </div>
  );
}
