import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  // uri: "http://localhost:3000/", // Task Management Server
  // uri: "http://localhost:3500/", // General Server
  // uri: "http://localhost:4000/", // Chatting Server
  uri: "http://192.168.18.138:4500/", // Authentication Server
  cache: new InMemoryCache(),
});