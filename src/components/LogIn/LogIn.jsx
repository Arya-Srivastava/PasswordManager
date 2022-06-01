import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LogIn.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";

function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  // Function to update username state with
  const handleNameChange = (e) => {
    console.log("this is event", e.target.value);
    setUsername(e.target.value);
  };
  // Function to update password state with
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);
    console.log(event.target.value);
    let user = {
      username,
      password,
    };
    console.log({ user });
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
    } else {
      axios
        .post("http://localhost:8080/token", user)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("userToken", response.data);
            navigate("/dashboard");
          }
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  return (
    <div className="Background">
      <Container className="d-flex vh-100">
        <Row className="m-auto align-self-center" style={{ maxWidth: "26rem" }}>
          <Col>
            <Card className="mt-3" id="loginForm">
              <Card.Header as="h5">Login Form</Card.Header>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Card.Body>
                  <Form.Group className="mb-3" as={Row} controlId="login">
                    <Form.Label column sm={3}>
                      Username
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        value={username}
                        required
                        onChange={handleNameChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your Username.
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    as={Row}
                    controlId="loginPassword"
                  >
                    <Form.Label column sm={3}>
                      Password
                    </Form.Label>
                    <Col>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="password"
                          value={password}
                          required
                          onChange={handlePasswordChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your password.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Form.Group>

                  <Stack>
                    <Form.Text id="signUpAssist">
                      Don't have an account? <a href="/">Sign up here</a>
                    </Form.Text>

                    <Form.Text>
                      <a href="/forgotPassword">Forgot Password?</a>
                    </Form.Text>
                  </Stack>

                  <div className="d-grid mt-2">
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </div>
                </Card.Body>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LogIn;
