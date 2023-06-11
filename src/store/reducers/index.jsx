import { jobResolver } from "./job.reducer";
import { packageResolver } from "./packages.reducer";
import { progressReducer } from "./progress.reducer";
import { userReducer } from "./user.reducer";

import { combineReducers } from "redux";


const rootReducers = combineReducers({
  user: userReducer,
  progress: progressReducer,
  pkg: packageResolver,
  job: jobResolver,
});

export default rootReducers;