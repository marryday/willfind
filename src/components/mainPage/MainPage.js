import React from 'react';
import logo from './logo.png';
import hands from './hands.png';
import './MainPage.css';

function MainPage() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="App-text">
          Will Find
        </p>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={hands} className="App-hands" alt="hands" />
      </header>
    </div >
  );
}

export default MainPage;
