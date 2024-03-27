import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/airswap/airswap",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;