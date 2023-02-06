import { loggedReducer } from "./isLogged.reducer"
import { userReducer } from "./user.reducer";

import { combineReducers } from "redux";


const rootReducers = combineReducers({
  isLogged: loggedReducer,
  user: userReducer,
});

export default rootReducers;