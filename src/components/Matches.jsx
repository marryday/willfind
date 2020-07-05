import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom'


export default () => {
  const [poteryash, setPoteryash] = useState("");
  const id = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`upload/countcoordinates/${id}`, { method: "GET" }).then((r) =>
      r.json().then((data) => {
        setPoteryash(data[0]);
      })
    );
  }, []);

  return (


    <Fragment>
      {poteryash ?
        < div className="firstFindPeople" >
          <div className='descriptionPeople'>
            <div className="fotoFindPeople"><img src={poteryash.image}></img></div>
            <div>
              <div> <h5> {poteryash.sex === "Male" ? 'Пропал' : 'Пропала'}</h5></div>
              <div> <h4> <b>{poteryash.lastName} {poteryash.firstName} {poteryash.middleName}</b></h4></div>
              <div style={{ fontSize: '16px' }}><b>Возраст: </b> {poteryash.ages} </div>
              <div style={{ fontSize: '16px' }}> <b>Местоположение:</b> {poteryash.addressOfLost}  </div>
              <div style={{ fontSize: '16px' }}> <b >Особые приметы:</b> {poteryash.specificMarks}  </div>
              <div style={{ fontSize: '16px' }}><Link to={`/people/${poteryash._id}`}>Подробнее</Link></div>

            </div>
          </div>

        </div>
        :
        <Fragment> Загрузка страницы</Fragment>}
    </ Fragment>
  );
};
