import { SET_USER, UPDATE_USER, LOGOUT_USER, GET_USER } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  accessToken: "",
  recommendation: 0.0,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UPDATE_USER:
      return action.payload;
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};