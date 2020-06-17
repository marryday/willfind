import {ADD_POINT} from "./types";

const initialState = {points: [{userId: 1, coordinates: [23, 12]}]};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POINT:
      return {...state, points: [...state.points, action.payload]}
    default:
      return state;
  }
}