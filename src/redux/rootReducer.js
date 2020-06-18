import {combineReducers} from "redux";

import reducer from "../reducers/reducer";
import {mapReducer} from "./mapReducer";
import {appReducer} from "../redux/appReducer";


export const rootReducer = combineReducers({
  reducer, mapReducer, appReducer
})
