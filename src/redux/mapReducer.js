import {ADD_POINT, PUT_COORDINATES} from "./types";

const initialState = {points: []};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_POINT:
    //   return {...state, points: [...state.points, action.payload]}
    case PUT_COORDINATES:
      return{...state, points: action.payload.ppl}
    default:
      return state;
  }
}