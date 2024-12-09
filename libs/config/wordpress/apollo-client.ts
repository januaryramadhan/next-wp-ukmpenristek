import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

if (!process.env.WORDPRESS_GRAPHQL_ENDPOINT) {
  throw new Error('WORDPRESS_GRAPHQL_ENDPOINT is not defined');
}

const httpLink = createHttpLink({
  uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export const getClient = () => apolloClient;