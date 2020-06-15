import React from "react";
//import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
// Пример thunk.
// import getNewFox from './actionCreators/actionCreatorThunk';
// Пример saga.
//import { loadImageSaga } from "./actionCreators/actionCreatorSaga";
import { Profile } from './components/user/Profile'
import NavBar from "./components/nav";
import Login from "./components/Login";
import Register from "./components/register";
import { MapComponent } from "./components/MapComponent";
import Chat from "./components/Chat";
import CreateMissed from "./components/CreateMissed";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/"></Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/registration">
        <Register />
      </Route>
      <Route exact path="/map">
        <Map />
      </Route>
      <Route exact path="/chat">
        <Chat />
      </Route>
      <Route exact path="/create">
        <CreateMissed />
      </Route>
    </BrowserRouter>
  );
}

export default App;
