import { loggedReducer } from "./isLogged.reducer"
import { profileReducer } from "./profile.reducer";
import { combineReducers } from "redux";
import { userReducer } from "./user.reducer";

const rootReducers = combineReducers({
  isLogged: loggedReducer,
  profile: profileReducer,
  user: userReducer,
});

export default rootReducers;