import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: "",
	name: "",
	email: "",
	password: "",
	picture: "",
	role: "",
	categories: [],
	birthday: "",
	gender: "",
	phone: "",
	address: "",
	city: "",
	country: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state
		},
		getUserFromLocalStorage: (state, action) => { },
		updateUser: (state, action) => { },
		logout: (state, action) => { },
	},
})

export const { setUser, getUserFromLocalStorage, updateUser, logout } = userSlice.actions;