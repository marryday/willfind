import {ADD_POINT} from "./types";

export function addPoint(payload) {
  return {
      type: ADD_POINT,
      payload: payload
  }
}