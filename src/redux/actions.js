import {ADD_POINT, PUT_COORDINATES} from "./types";

export function addPoint(payload, id) {
  return {
      type: ADD_POINT,
      payload: payload,
      id
  }
}

export function putCoordinates(payload){
  return{
    type: PUT_COORDINATES,
    payload: payload,
  }
}