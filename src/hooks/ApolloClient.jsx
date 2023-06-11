import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BACKEND_PORT } from "@env";

export const client = new ApolloClient({
  uri: `http://localhost:${BACKEND_PORT}/`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    }
  }
});