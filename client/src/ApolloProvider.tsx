import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ApolloProviderProps } from "@apollo/client/react/context";

const client = new ApolloClient({
  uri: "http://localhost:5173",
  cache: new InMemoryCache(),
});

export default function Provider(props: ApolloProviderProps<InMemoryCache>) {
  return <ApolloProvider {...props} client={client} />;
}
