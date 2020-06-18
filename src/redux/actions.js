import { ADD_POINT, PUT_COORDINATES, SET_IMAGE, SET_SAGA_STATE } from "./types";

export function addPoint(payload, id) {
  return {
    type: ADD_POINT,
    payload: payload,
    id,
  };
}

export function putCoordinates(payload) {
  return {
    type: PUT_COORDINATES,
    payload: payload,
  };
}

export function setImage(payload) {
  return { type: SET_IMAGE, src: payload };
}

export function setSagaState() {
  return { type: SET_SAGA_STATE };
}
