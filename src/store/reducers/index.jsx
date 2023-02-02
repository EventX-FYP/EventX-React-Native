import { loggedReducer } from "./isLogged.reducer"
import { packagesReducer } from "./packages.reducer"
import { profileReducer } from "./profile.reducer";
import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";

const rootReducers = combineReducers({
  isLogged: loggedReducer,
  package: packagesReducer,
  profile: profileReducer,
  user: userReducer,
});

export default rootReducers;