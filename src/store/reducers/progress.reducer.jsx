import { START_PROGESS, STOP_PROGESS } from "../types";

const initialState = false;

export const progressReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_PROGESS:
			return true;
		case STOP_PROGESS:
			return false;
		default:
			return state;
	}
}