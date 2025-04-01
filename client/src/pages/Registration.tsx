import { Row, Col, Form, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";

interface RegistrationVariables {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function Registration() {
  const [variables, setVariables] = useState<RegistrationVariables>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const sumbitRegistrationForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(variables);
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={sumbitRegistrationForm}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
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
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
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
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={variables.confirmPassword}
              onChange={(e) =>
                setVariables((current) => ({
                  ...current,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Registration;
