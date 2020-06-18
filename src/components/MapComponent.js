import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {YMaps, Map, Clusterer, Placemark} from "../ymaps";
import {setSagaState} from '../redux/actions'

const mapState = {
  center: [55.751574, 37.573856],
  zoom: 9,
  behaviors: ["default", "scrollZoom"],
  coordinates: []
};
const getPointData = (
  firstName,
  lastName,
  middleName,
  birthDate,
  clothes,
  timeOfLost,
  id,
  image) => {
  return {
    balloonContentBody:
      `<address>
      <strong>${firstName} ${lastName} ${middleName}</strong>,
      <br/>
      <img 
      alt="Remy Sharp"
       src="${image}" 
       />
    <br/>
    
      Год рождения: ${birthDate}, 
      <br/>
      Дата пропажи: ${timeOfLost},
       <br/>
      Во что был одет: ${clothes},
      <br/>
      Перейти в профиль,<a href="/people/${id}"> подробнее...</a>,
      </address>`,
    clusterCaption: ` <strong> ${firstName} ${lastName} ${middleName}</strong>`
  };
};
const getPointOptions = () => {
  return {
    preset: "islands#violetIcon"
  };
};
export default function MapComponent() {
  const dispatch = useDispatch();
  const [searchQuery, SetSearchQuery] = useState('')
  const obj = {type: 'SET_STATE'}

  useEffect(() => {
    dispatch(setSagaState())
  }, [])
  const personsObjectArray = useSelector((state) => state.mapReducer.points)
  console.log(personsObjectArray)


  const handleInput = (event) => {
    SetSearchQuery(event.target.value);
  }
  const getInputValue = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
  }, [])
  return (
    <>
      <div className="AppMap">
        <YMaps>
          <Map state={mapState}>
            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false,
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
              }}
            >

              {personsObjectArray.length > 0 && personsObjectArray.map((objUser, idx) => {
                return <Placemark
                  key={objUser._id}
                  geometry={{coordinates: objUser.coordinates}}
                  properties={
                    getPointData(
                      objUser.firstName,
                      objUser.lastName,
                      objUser.middleName,
                      objUser.birthDate,
                      objUser.clothes,
                      objUser.timeOfLost,
                      objUser._id,
                      objUser.image
                    )}
                  options={getPointOptions()}
                />
              })}
            </Clusterer>
          </Map>
        </YMaps>
      </div>
    </>
  );
}
