import { Container } from "react-bootstrap";

import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client";

import "./App.scss";
import Registration from "./pages/Registration";

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className="pt-5">
        <Registration />
      </Container>
    </ApolloProvider>
  );
}

export default App;
