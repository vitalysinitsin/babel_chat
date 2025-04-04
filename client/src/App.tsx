import { Container } from "react-bootstrap";

import ApolloProvider from "./ApolloProvider";

import "./App.scss";
import Registration from "./pages/Registration";

function App() {
  return (
    <ApolloProvider>
      <Container className="pt-5">
        <Registration />
      </Container>
    </ApolloProvider>
  );
}

export default App;
