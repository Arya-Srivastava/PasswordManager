import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import "./SignUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import SecurityQues from "../SecurityQues/SecurityQues";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [secQues, setSecQues] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  // function to update state of name with
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  // function to update state of password with
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNext = async (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setLoginInfo({ username, password });
      console.log({ loginInfo });
      setSecQues(true);
    }
  };

  const handleSubmit = async (question) => {
    const userInfo = {
      username,
      password,
      question,
    };
    const response = await axios.post(
      `http://localhost:8080/user/credentials`,
      userInfo
    );
    if (response.status === 200) {
      navigate("/login");
    }
    console.log("successfully account created", response);
  };

  return (
    <>
      {secQues ? (
        <SecurityQues handleSubmit={handleSubmit} />
      ) : (
        <div className="App">
          <Container className="d-flex vh-100">
            <Row
              className="m-auto align-self-center"
              style={{ maxWidth: "30rem" }}
            >
              <Col>
                <Card className="mt-3" id="signUpForm">
                  <Card.Header as="h5">Sign Up Form</Card.Header>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => handleNext(e)}
                  >
                    <Card.Body>
                      <Form.Group
                        className="mb-3"
                        as={Row}
                        controlId="signUpFormName"
                      >
                        <Form.Label column sm={3}>
                          Username
                        </Form.Label>
                        <Col>
                          <Form.Control
                            type="text"
                            value={username}
                            required
                            onChange={(e) => handleChange(e)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a display name.
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        as={Row}
                        controlId="signUpFormPassword"
                      >
                        <Form.Label column sm={3}>
                          Password
                        </Form.Label>
                        <Col>
                          <Form.Control
                            type="password"
                            value={password}
                            required
                            onChange={(e) => handlePasswordChange(e)}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a password.
                          </Form.Control.Feedback>
                          <PasswordStrengthBar password={password} />
                        </Col>
                      </Form.Group>

                      <Form.Text>
                        Have an account? <a href="/login">Login here</a>
                      </Form.Text>

                      <div className="d-grid mt-2">
                        <Button variant="primary" type="submit">
                          Next
                        </Button>
                      </div>
                    </Card.Body>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default SignUp;
