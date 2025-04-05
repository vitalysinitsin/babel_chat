import { Row, Col, Form, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, redirect, useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

interface RegistrationVariables {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

type GraphQlErrors = {
  [key: string]: string;
};

function Registration() {
  const [variables, setVariables] = useState<RegistrationVariables>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<GraphQlErrors>({});
  const navigate = useNavigate();
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => navigate("/login", { replace: true }),
    onError: (err) => {
      console.log(err);

      setErrors(err.graphQLErrors[0].extensions?.errors as GraphQlErrors);
    },
  });

  const sumbitRegistrationForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={sumbitRegistrationForm}>
          <Form.Group className="mb-3">
            <Form.Label className={errors.email && "text-danger"}>
              {errors.email ?? "Email address"}
            </Form.Label>
            <Form.Control
              type="email"
              className={errors.email && "is-invalid"}
              value={variables.email}
              onChange={(e) =>
                setVariables((current) => ({
                  ...current,
                  email: e.target.value,
                }))
              }
            />
          </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Label className={errors.confirmPassword && "text-danger"}>
              {errors.confirmPassword ?? "Confirm Password"}
            </Form.Label>
            <Form.Control
              type="password"
              className={errors.confirmPassword && "is-invalid"}
              value={variables.confirmPassword}
              onChange={(e) =>
                setVariables((current) => ({
                  ...current,
                  confirmPassword: e.target.value,
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
              {loading ? "Loading..." : "Register"}
            </Button>
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Registration;
