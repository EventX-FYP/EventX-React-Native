import { Chat } from "../types";

export const chatReducer = (state = [], action) => {
  switch (action.type) {
    case Chat.GET_CHATS:
      return action.payload;
    
      case Chat.GET_CHAT:
      return action.payload;

    case Chat.CREATE_CHAT:
      return action.payload;
    
    case Chat.UPDATE_CHAT:
      return action.payload;
    
    case Chat.DELETE_CHAT:
      return action.payload;
    
    case Chat.GET_CHAT_MESSAGES:
      return action.payload;
    
    case Chat.GET_CHAT_MESSAGE:
      return action.payload;
    
    case Chat.CREATE_CHAT_MESSAGE:
      return action.payload;
    
    case Chat.UPDATE_CHAT_MESSAGE:
      return action.payload;

    case Chat.DELETE_CHAT_MESSAGE:
      return action.payload;
    
    default:
      return state;
  }
};