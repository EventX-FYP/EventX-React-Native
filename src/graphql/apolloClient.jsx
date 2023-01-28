import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/graphql',
});

const logoutLink = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    // logout();
  }
});

export const createApolloClient = () => {
  return new ApolloClient({
    link: logoutLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};