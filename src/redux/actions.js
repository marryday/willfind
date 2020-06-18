import {
  ADD_POINT,
  HIDE_ALERT,
  HIDE_LOADER,
  PUT_COORDINATES,
  SET_IMAGE,
  SET_SAGA_STATE,
  SHOW_ALERT,
  SHOW_LOADER
} from "./types";

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
export function showLoader() {
  return {
    type: SHOW_LOADER,
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  }
}

export function showAlert(text) {
  return {
      type: SHOW_ALERT,
      payload: text
    }

    // setTimeout(() => {
    //   dispatch(hideAlert())
    // }, 3000)

}

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  }
}
