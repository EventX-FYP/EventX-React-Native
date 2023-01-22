import { loggedReducer } from "./isLogged.reducer"
import { packagesReducer } from "./packages.reducer"
import { profileReducer } from "./profile.reducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  isLogged: loggedReducer,
  package: packagesReducer,
  profile: profileReducer,
});

export default rootReducers;