import { Packages } from "../types";

export const packagesReducer = (state = [], action) => {
  const { ADD_PACKAGE, UPDATE_PACKAGE, REMOVE_PACKAGE, GET_PACKAGES, GET_PACKAGE } = Packages;
  switch (action.type) {
    case ADD_PACKAGE:
      return [...state, action.payload];
    case UPDATE_PACKAGE:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    case REMOVE_PACKAGE:
      return state.filter((item) => item.id !== action.payload.id);
    case GET_PACKAGES:
      return action.payload;
    case GET_PACKAGE:
      return action.payload;
    default:
      return state;
  }
}