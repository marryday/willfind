import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { YMaps, Map, Clusterer, Placemark } from "../ymaps";

import points from "./points.json";
import Button from "@material-ui/core/Button";
import { addPoint } from "../redux/actions";

const TOKEN = 'ac85ebda-7107-4441-88aa-069cf0857ea8';


// import "../styles.css";

const mapState = {
  center: [55.751574, 37.573856],
  zoom: 9,
  behaviors: ["default", "scrollZoom"],
  coordinates: []
};

const getPointData = index => {
  return {
    balloonContentBody: "acemark <strong>balloon " + index + "</strong>",
    clusterCaption: "placemark <strong>" + index + "</strong>"
  };
};

const getPointOptions = () => {
  return {
    preset: "islands#violetIcon"
  };
};

export function MapComponent() {
  const dispatch = useDispatch();
  const [searchQuery, SetSearchQuery] = useState('')

  const handleInput = (event) => {
    SetSearchQuery(event.target.value);
  }

  const getInputValue = (event) => {
    event.preventDefault();
  }

  //poluchit' pointi
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
              {points.map((coordinates, idx) => (
                <Placemark
                  key={idx}
                  geometry={{ coordinates }}
                  properties={getPointData(idx)}
                  options={getPointOptions()}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
      </div>
      <form onSubmit={(event) => {
        event.preventDefault();
        dispatch(addPoint(searchQuery))
      }}>
        <input type='text' name='inputСoordinates' onChange={handleInput} />
        <Button variant="contained" color="primary" type='submit'>
          Добавить точку
        </Button>
      </form>
      {searchQuery}
    </>
  );
}



