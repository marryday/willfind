import React, { Fragment, useEffect, useState } from "react";
import MapComponent from "./MapComponent"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import List from "./list";

export default function Map() {
  const [map, setMap] = useState(true)

  //useEffect(() => { }, [map])

  const changeComponent = (bol) => {
    console.log(bol)
    setMap(bol);
  }
  return (
    <Fragment>
      <div className="mainMapComponent">
        <ButtonGroup className="btnTwo" variant="contained" color="primary" aria-label="contained primary button group">
          <Button onClick={() => changeComponent(false)}>Список</Button>
          <Button onClick={() => changeComponent(true)} >Карта</Button>
        </ButtonGroup>
        {map ? <MapComponent /> : <List />}
      </div>
    </Fragment>
  )
}
