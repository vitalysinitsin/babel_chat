import { Container } from "react-bootstrap";

import client from "./ApolloClient";
import { ApolloProvider } from "@apollo/client";

import "./App.scss";
import Registration from "./pages/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Container className="pt-5">
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="registration" element={<Registration />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
