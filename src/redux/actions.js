import {ADD_POINT} from "./types";

export function addPoint(payload, id) {
  return {
      type: ADD_POINT,
      payload: payload,
      id
  }
}