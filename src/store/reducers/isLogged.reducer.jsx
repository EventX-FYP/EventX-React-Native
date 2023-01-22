import { Logged } from "../types";

export const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case Logged.SIGN_IN:
      return !state;
    default:
      return state;
  }
};