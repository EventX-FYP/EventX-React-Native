import { Profile } from "../types";

export const profileReducer = (state = {}, action) => {
  const { NEW_PROFILE, UPDATE_PROFILE, DELETE_PROFILE, GET_PROFILE } = Profile;
  switch (action.type) {
    case UPDATE_PROFILE:
      /*
      */
      return action.payload;
    case DELETE_PROFILE:
      return {};
    case GET_PROFILE:
      return state;
    case NEW_PROFILE:
      return action.payload;
    default:
      return state;
  }
}