import React from "react";
import logo from "./logo.svg";
import "./NavBar.css";
import { Button, Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppModal from "../../Common/AppModal";
import axios from "axios";
import { useEffect } from "react";

export default function NavBar({
  show,
  handleShow,
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
}) {
  const userToken = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/credential`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        setProfileName(response.data);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="light" className="navbar">
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} width="40px" height="40px" alt="logo" /> Password
          Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Button variant="" onClick={handleShow} className="text-start">
              Add Account
            </Button>
            <AppModal
              handleNameChange={handleNameChange}
              handleUrlChange={handleUrlChange}
              username={username}
              password={password}
              handlePasswordChange={handlePasswordChange}
              handleShow={handleShow}
              show={show}
              handleClose={handleClose}
              validated={validated}
              handleSubmit={handleSubmit}
              handleAppNameChange={handleAppNameChange}
              url={url}
              name={name}
            />
          </Nav>
          <Nav className="p-3">
            <NavDropdown
              title={profileName}
              id="collasible-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
