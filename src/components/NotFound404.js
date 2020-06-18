import React from "react";
import './NotFound404.css';
import logo from './Broken-compass.png';

export function NotFound404() {
  return (
    <div className="errorDiv">
      <img src={logo} className="error-logo" />
      <div className="textError">

        <h1>#404 мы не нашли такую страницу.</h1>
        <br></br>
        <h3>Может лучше поищем пропавших людей? :)</h3>
      </div>
    </div>
  )
}
