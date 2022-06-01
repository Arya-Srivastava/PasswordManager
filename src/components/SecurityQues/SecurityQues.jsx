import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./SecurityQues.css";

const SecurityQues = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const [ques1, setQues1] = useState("");
  const [ques2, setQues2] = useState("");
  const [ques3, setQues3] = useState("");
  const [ques4, setQues4] = useState("");
  const [validated, setValidated] = useState(false);

  const handleQues1Change = (e) => {
    setQues1(e.target.value);
  };

  const handleQues2Change = (e) => {
    setQues2(e.target.value);
  };

  const handleQues3Change = (e) => {
    setQues3(e.target.value);
  };

  const handleQues4Change = (e) => {
    setQues4(e.target.value);
  };

  const handleSignup = async (e) => {
    let question = [
      {
        question: ques1,
      },
      {
        question: ques2,
      },
      {
        question: ques3,
      },
      {
        question: ques4,
      },
    ];
    const form = e.currentTarget;
    setValidated(true);
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    handleSubmit(question);
  };

  return (
    <div className="Background">
      <Container className="d-flex vh-100">
        <Row className="m-auto align-self-center" style={{ width: "28rem" }}>
          <Col>
            <Card className="my-3" id="security">
              <Card.Header as="h5">Security Questions</Card.Header>
              <Form noValidate validated={validated} onSubmit={handleSignup}>
                <Card.Body>
                  <Form.Text>
                    <a href="/">Back to Sign Up</a>
                  </Form.Text>

                  <Form.Group
                    className="mt-4 mb-3"
                    as={Row}
                    controlId="question-1"
                  >
                    <Form.Label>
                      What is the name of your favorite childhood friend?
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        value={ques1}
                        required
                        onChange={handleQues1Change}
                      />
                      <Form.Control.Feedback type="invalid">
                        Missing answer
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" as={Row} controlId="question-2">
                    <Form.Label>
                      What school did you attend for sixth grade?
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        value={ques2}
                        required
                        onChange={handleQues2Change}
                      />
                      <Form.Control.Feedback type="invalid">
                        Missing answer
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Row} controlId="question-3">
                    <Form.Label>What was your childhood nickname?</Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        value={ques3}
                        required
                        onChange={handleQues3Change}
                      />
                      <Form.Control.Feedback type="invalid">
                        Missing answer
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group className="mb-3" as={Row} controlId="question-4">
                    <Form.Label>
                      What street did you live on in third grade?
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        value={ques4}
                        required
                        onChange={handleQues4Change}
                      />
                      <Form.Control.Feedback type="invalid">
                        Missing answer
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <div className="d-grid mt-4">
                    <Button variant="primary" type="submit">
                      Sign Up
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
};

export default SecurityQues;
