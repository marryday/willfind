import React from "react";
//import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
// Пример thunk.
// import getNewFox from './actionCreators/actionCreatorThunk';
// Пример saga.
//import { loadImageSaga } from "./actionCreators/actionCreatorSaga";
import { Profile } from './components/user/Profile'
import NavBar from "./components/nav";
import Login from "./components/Login";
import Register from "./components/register";
import Map from "./components/map";
import Chat from "./components/Chat";
import CreateMissed from "./components/CreateMissed";
export const history = createHistory();
function App() {
  return (
    <BrowserRouter history={history}>
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
      <Route exact path="/profile">
        <Profile />
      </Route>
    </BrowserRouter>
  );
}

export default App;
