import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import "./ChatStyle.css";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { firebaseConfig } from "../FirebaseConfig";
import { FormHelperText } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '70ch',
    },
  },
}));

export default () => {
  const address = document.location.href;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);
  const classes = useStyles();
  let temp;
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    getMessages();
  }, []);

  useEffect(() => {
    ref.current && ref.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
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
    <div className="firstFindPeople">
      <Paper elevation={3} className="sendPost">
        <div className='descriptionPeople'>
          <div className="fotoFindPeople"><img src="http://info-la.ru/photo/84473_7191494738.jpg"></img></div>
          <div>
            <div> Пропал  </div>
            <div> Иванов Иван Иванович  </div>
            <div> Возраст:  </div>
            <div> Местоположение:  </div>
            <div> Приметы, одежда:  </div>
            <div>  </div>
            <div>  </div>
            <div>  </div>
            <div>  </div>
          </div>
        </div>
      </Paper>



      <Paper elevation={3}>
        <div className="chat">
          {messages.map((message) =>
            message.text ? (
              <div className="comment">
                <div>
                  <FormHelperText>User: <b>{message.user}</b> </FormHelperText>
                  <p key={message.id} ref={ref}>
                    {message.text}
                  </p>
                  <hr />
                </div>
              </div>
            ) : (
                <div className="comment">
                  <div>
                    <FormHelperText >User: <b>{message.user}</b></FormHelperText>
                    <img
                      src={message.url}
                      style={{ maxWidth: "300px" }} ref={ref} alt="pic" />
                    <hr />
                  </div>
                </div>
              )
          )}
        </div>

        <div className="inputChat">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="filled-textarea"
              onChange={(e) => setInput(e.target.value)}
              label="Комментарий"
              multiline
              value={input}
              variant="outlined"
              onKeyPress={(e) => {
                if (e.charCode === 13 && input.trim() !== "") {
                  setMessages([...messages, input]);
                  writeMessageToDb(input, "text");
                  setInput("");
                }
              }}
            />
            <div className="inputAndSend">
              <Send
                onClick={() => {
                  // if (temp && (input.trim() !== "")) {
                  //   setMessages([...messages, input]);
                  //   writeMessageToDb(input, "text");
                  //   setInput("");
                  // } else if (input.trim() !== "") {
                  //   setMessages([...messages, input]);
                  //   writeMessageToDb(input, "text");
                  //   setInput("");
                  // }



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
                onChange={(event) => { temp = event.target.files[0]; console.log(temp) }}

              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          </form>
        </div>

      </Paper>
    </div>
  );
};
