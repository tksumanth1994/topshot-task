import PropTypes from "prop-types";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "apollo-boost";
import { onError } from "apollo-link-error";
import { ApolloProvider } from "react-apollo";
import "../styles/bulma.sass";
import "../styles/globals.css";

const GITHUB_BASE_URL = "https://api.github.com/graphql";
const GITHUB_PERSONAL_ACCESS_TOKEN = "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";

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}`
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    console.log("🚀 ~ file: _app.js ~ line 20 ~ errorLink ~ graphQLErrors", graphQLErrors);
  graphQLErrors.forEach(({ message, locations, path }) =>
    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
  );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  pageProps: PropTypes.shape({}),
  Component: PropTypes.elementType
};

export default MyApp;
