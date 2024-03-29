import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/44349/crypto-punks/v0.0.1",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;