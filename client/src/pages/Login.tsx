import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

interface LoginVariables {
  username: string;
  password: string;
}

type GraphQlErrors = {
  [key: string]: string;
};

export default function Login() {
  const [variables, setVariables] = useState<LoginVariables>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<GraphQlErrors>({});
  const navigate = useNavigate();
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions?.errors as GraphQlErrors);
    },
  });

  const submitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Login</h1>
        <Form onSubmit={submitLoginForm}>
          <Form.Group className="mb-3">
            <Form.Label className={errors.username && "text-danger"}>
              {errors.username ?? "Username"}
            </Form.Label>
            <Form.Control
              type="text"
              className={errors.username && "is-invalid"}
              value={variables.username}
              onChange={(e) =>
                setVariables((current) => ({
                  ...current,
                  username: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={errors.password && "text-danger"}>
              {errors.password ?? "Password"}
            </Form.Label>
            <Form.Control
              type="password"
              className={errors.password && "is-invalid"}
              value={variables.password}
              onChange={(e) =>
                setVariables((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
            />
          </Form.Group>
          <div className="d-flex flex-column gap-2 align-items-center text-center">
            <Button
              className="w-25"
              variant="success"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <small>
              Don't have an account? <Link to="/registration">Register</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
