import {ADD_POINT, PUT_COORDINATES, SET_ADDRESS} from "./types";

const initialState = {points: []};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_POINT:
    //   return {...state, points: [...state.points, action.payload]}
    case PUT_COORDINATES:
      return{...state, points: action.payload.ppl}
    case SET_ADDRESS: 
    return{...state, user: action.payload}
    case 'SET_PAYMENT':
      return{...state, payment: action.payload}
    default :
      return state;
  }
}