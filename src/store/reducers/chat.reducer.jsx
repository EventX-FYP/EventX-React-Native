import { GET_CHATS, GET_CHAT, CREATE_CHAT, UPDATE_CHAT, DELETE_CHAT, GET_CHAT_MESSAGES, GET_CHAT_MESSAGE, CREATE_CHAT_MESSAGE, UPDATE_CHAT_MESSAGE, DELETE_CHAT_MESSAGE } from "../types";

export const chatReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CHATS:
      return action.payload;
    
    case GET_CHAT:
      return action.payload;

    case CREATE_CHAT:
      return action.payload;
    
    case UPDATE_CHAT:
      return action.payload;
    
    case DELETE_CHAT:
      return action.payload;
    
    case GET_CHAT_MESSAGES:
      return action.payload;
    
    case GET_CHAT_MESSAGE:
      return action.payload;
    
    case CREATE_CHAT_MESSAGE:
      return action.payload;
    
    case UPDATE_CHAT_MESSAGE:
      return action.payload;

    case DELETE_CHAT_MESSAGE:
      return action.payload;
    
    default:
      return state;
  }
};