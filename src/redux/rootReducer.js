import {combineReducers} from "redux";

import reducer from "../reducers/reducer";
import {mapReducer} from "./mapReducer";


export const rootReducer = combineReducers({
  reducer, mapReducer
})