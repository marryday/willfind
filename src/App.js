import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Profile } from "./components/user/Profile";
import NavBar from "./components/nav";
import Login from "./components/Login";
import Register from "./components/register";
import Map from "./components/map";
import { NotFound404 } from "./components/NotFound404";
import History from "./heplers/history"
import PoteryashList from './components/PoteryshList'
import CreateMissed from './components/CreateMissed'
import Chat from './components/Chat'
import MainPage from './components/mainPage/MainPage'
import Copyright from "./components/Copyright";

function App() {
  return (
    <Router history={History}>
      <NavBar />

      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/registration">
        <Register />
      </Route>
      <Route exact path="/map">
        <Map />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/poteryash">
        <PoteryashList />
      </Route>
      <Route exact path="/create">
        <CreateMissed />
      </Route>
      <Route exact path="/people/:id">
        <Chat />
      </Route>
      {/* <Route>
        <NotFound404 />
      </Route> */}

      {/*<Redirect to={'/404'}></Redirect>*/}
      {/*<Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} />*/}
      <Copyright />
    </Router>
  );
}

export default App;
