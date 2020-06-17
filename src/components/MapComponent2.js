import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import {YMaps, Map, Placemark, Clusterer} from 'react-yandex-maps';

const TOKEN = 'ac85ebda-7107-4441-88aa-069cf0857ea8'
let coordinatesArray = [
  [55.753083, 37.587614],
  [55.752886, 37.584972],
]
const defaultState = {
  center: [55.751574, 37.573856],
  zoom: 9,
  behaviors: ["default", "scrollZoom"],
  coordinates: []
};

export function MapComponent2() {
  const [searchQuery, SetSearchQuery] = useState('')

  const handleInput = (event) => {
    SetSearchQuery(event.target.value);
  }

  const getInputValue = (event) => {
    event.preventDefault();
    document.getElementById('viewText').innerText = searchQuery;
  }
  const getFetchSearchQuery = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${TOKEN}&geocode=${searchQuery}`)
    const result = await response.json()
    const coordinates = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
    const latitude = coordinates[1]
    const longitude = coordinates[0]

    console.log('result', result)
    console.log('coordinates', coordinates)
    console.log('latitude', latitude)
    console.log('longitude', longitude)
    // let placemark = new YMaps.Placemark([latitude, longitude], {})
    // if (coordinates) Map.geoObjects.add(placemark);
  }
  // useEffect(async () => {
  //   console.log('hi')
  //   const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=ac85ebda-7107-4441-88aa-069cf0857ea8&geocode=${searchQuery}`)
  //   console.log('response', response)
  //   const result = response.json()
  //   console.log('result', result)
  // })

  return (<>
    <form onSubmit={getFetchSearchQuery}>
      <input type='text' name='inputСoordinates' onChange={handleInput}/>
      <Button variant="contained" color="primary" type='submit'>
        Добавить точку
      </Button>
    </form>
    <p id='viewText'></p>
    {/*<YMaps>*/}
    {/*  <div id="map">*/}
    {/*    My awesome application with maps!*/}
    {/*    <Map defaultState={{center: [55.75, 37.57], zoom: 9}}/>*/}
    {/*  </div>*/}
    {/*</YMaps>*/}
    <YMaps>
      <Map defaultState={defaultState}>
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
          }}
        >
        {coordinatesArray.map(coordinate => <Placemark geometry={coordinate} />)}
        </Clusterer>
      </Map>
    </YMaps>
    
  </>)
}