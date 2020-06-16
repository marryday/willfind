import React from "react";
//import { useSelector, useDispatch } from "react-redux";
import { Router, Route } from "react-router-dom";
// Пример thunk.
// import getNewFox from './actionCreators/actionCreatorThunk';
// Пример saga.
//import { loadImageSaga } from "./actionCreators/actionCreatorSaga";
import { Profile } from "./components/user/Profile";
import NavBar from "./components/nav";
import Login from "./components/Login";
import Register from "./components/register";
import { MapComponent } from "./components/MapComponent";
import { MapComponent2 } from "./components/MapComponent2";
import { NotFound404 } from "./components/NotFound404";
import History from "./heplers/history"


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
        <MapComponent />
      </Route>
      <Route exact path="/map2">
        <MapComponent2 />
      </Route>
      <Route exact path="/404">
        <NotFound404 />
      </Route>
      {/*<Redirect to={'/404'}></Redirect>*/}
      {/*<Route render={() => <h1 style={{color: 'red', textAlign: 'center'}}>404 not found</h1>} />*/}
    </Router>
  );
}

export default App;
