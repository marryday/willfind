import React from "react";
import { Router, Route } from "react-router-dom";
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

function App() {
  return (
    <Router history={History}>
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
      <Route path="/404">
        <NotFound404 />
      </Route>
      {/*<Redirect to={'/404'}></Redirect>*/}
      {/*<Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} />*/}
    </Router>
  );
}

export default App;
