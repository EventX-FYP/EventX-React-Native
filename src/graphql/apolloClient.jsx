import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { BACKEND_PORT } from "@env";
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenNavigator } from '../helper';

const httpLink = new HttpLink({
  // uri: 'https://countries.trevorblades.com/graphql',
  uri: `http://192.168.18.138:4000/graphql`,
});


function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    link: httpLink,
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
}

export default createApolloClient;