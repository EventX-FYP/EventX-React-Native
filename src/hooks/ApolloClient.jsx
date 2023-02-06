import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CHATTING_PORT, TASK_PORT, AUTHENTICATION_PORT, SOCKET_PORT } from "@env";

export const client = new ApolloClient({
  // uri: `http://localhost:${AUTHENTICATION_PORT}/`, // Authentication Server
  uri: `http://localhost:${CHATTING_PORT}/`, // Chatting Server
  // uri: `http://localhost:${GENERAL_PORT}/`, // General Server
  // uri: `http://localhost:${SOCKET_PORT}/`, // Socket Server
  // uri: `http://localhost:${TASK_PORT}/`, // Task Server
  cache: new InMemoryCache(),
});