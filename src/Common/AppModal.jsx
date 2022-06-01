import React, { useState } from "react";
import { Button, Modal, Form, Col, Row, InputGroup } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Settings from "../components/Settings/Settings";
import PasswordGenerator from "../components/PasswordGenerator/PasswordGenerator";
const AppModal = ({
  show,
  handleClose,
  validated,
  handleSubmit,
  handleAppNameChange,
  handleUrlChange,
  username,
  password,
  handlePasswordChange,
  handleNameChange,
  url,
  name,
}) =>
 {
   const navigate=useNavigate();
   const [generatePassword,setGeneratePassword]=useState(<p></p>)
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Account Credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" as={Row} controlId="appname">
            <Form.Label column sm={3}>
              App Name
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                value={name}
                required
                onChange={handleAppNameChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter App Name.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row} controlId="accounturl">
            <Form.Label column sm={3}>
              URL
            </Form.Label>
            <Col>
              <Form.Control
                type="url"
                value={url}
                required
                onChange={handleUrlChange}
                placeholder="https://"
              />
              <Form.Control.Feedback type="invalid">
                Please enter Url.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row} controlId="accountusername">
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

          <Form.Group className="mb-3" as={Row} controlId="accountpassword">
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
                 <Button variant="outline-primary" onClick={(event)=> {event.preventDefault();setGeneratePassword(<PasswordGenerator />)}}>
              Generate Password
            </Button> 
              </InputGroup>
            </Col>
          </Form.Group>
          {
            generatePassword
          }
          <div style={{marginTop:"20px"}}>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>{" "}
            <Button variant="outline-success" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AppModal;
