import { GET_PACKAGES, SET_PACKAGES, UPDATE_PACKAGE } from "../types"

const initialState = {
	id: "",
	createdAt: "",
	updatedAt: "",
	title: "",
	description: "",
	price: 0,
	picture: "",
	sellerId: "",
	categories: [],
	packages: [],
}

export const packageResolver = (state = initialState, action) => {
	switch (action.type) {
		case GET_PACKAGES:
			return state;
		case SET_PACKAGES:
			return action.payload;
		case UPDATE_PACKAGE:
			return action.payload;
		default:
			return state;
	}
}