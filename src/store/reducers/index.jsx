import { loggedReducer } from "./isLogged.reducer"
import { packagesReducer } from "./packages.reducer"
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  isLogged: loggedReducer,
  package: packagesReducer,
});

export default rootReducers;