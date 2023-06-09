import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BACKEND_PORT } from "@env";

export const client = new ApolloClient({
  uri: `http://localhost:${BACKEND_PORT}/`,
  cache: new InMemoryCache(),
});