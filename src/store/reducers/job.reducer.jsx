import { GET_JOB, SET_JOB } from "../types"

const initialState = null

export const jobResolver = (state = initialState, action) => {
	switch (action.type) {
		case GET_JOB:
			return state;
		case SET_JOB:
			return action.payload;
		default:
			return state;
	}
}