import { User } from "../types";

const initialState = {
  id: "",
  name: "",
  email: "",
  password: "",
  type: "",
  categories: [],
  packages: [],
  dob: "",
  gender: "",
  contact_number: "",
  address: "",
  city: "",
  state: "",
  country: "",
  picture: "",
};

export const userReducer = (state = initialState, action) => {
  const { UPDATE_USER, DELETE_USER, GET_USER, CREATE_USER } = User
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    case DELETE_USER:
      return {};
    case GET_USER:
      return state;
    case CREATE_USER:
      return action.payload;
    default:
      return state;
  }
};