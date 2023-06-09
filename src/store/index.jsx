import { createStore, compose } from "redux";
// import rootReducers from "./reducers";

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducers, composeEnhancers());

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
	}
});

export default store;