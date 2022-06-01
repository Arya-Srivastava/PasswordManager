import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import AppModal from "../../Common/AppModal";
import DeleteModal from "../../Common/DeleteModal";

export default function InfoCard({
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
  edit,
  handleEditChange,
  name,
  setEdit,
  setName,
  setPassword,
  setUrl,
  setUsername,
  accountData,
  setAccountData,
}) {
  const userToken = localStorage.getItem("userToken");

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${userToken}`,
    },
  };

  useEffect(() => {
    async function fetchPasswords() {
      // console.log(userToken);
      const response = await axios.get(
        "http://localhost:8080/accounts",
        config
      );
      setAccountData(response.data.data);
    }
    if (userToken) {
      fetchPasswords();
    }
  }, [userToken]);

  const getData = () => {
    axios.get(`http://localhost:8080/accounts`, config).then((getData) => {
      setAccountData(getData.data.data);
    });
  };

  const handleOpenModal = (id) => {
    handleEditChange(id);
  };

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/accounts`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          id: id,
        },
      });
      console.log({ response });
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.log({ error });
      return error;
    }
  };

  return (
    <Container>
      <Row>
        {accountData.map((accountData, k) => (
          <Col key={k} xs={12} md={4} lg={3}>
            <Card className="p-3 m-3">
              <a href={accountData.url} target="_blank" rel="noreferrer">
                <Card.Img src={`https://logo.clearbit.com/${accountData.url}` } height={250} width={250}></Card.Img>
              </a>
              <Card.Body>
                <Card.Title>{accountData.name}</Card.Title>
              </Card.Body>
              <div>
                {/* <Button
                  variant="outline-danger"
                  onClick={handleShow}
                >
                  Delete
                </Button>{" "} */}
                <DeleteModal
                accountData={accountData}
                setAccountData={setAccountData}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal(accountData.accountId)}
                >
                  Update
                </Button>{" "}
                <Button
                  variant="outline-primary"
                  onClick={() =>
                    navigator.clipboard.writeText(accountData.password)
                  }
                >
                  Copy
                </Button>{" "}
              </div>
            </Card>
          </Col>
        ))}
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
          handleEditChange={handleEditChange}
          setEdit={setEdit}
          edit={edit}
          accountData={accountData}
          setName={setName}
          setPassword={setPassword}
          setUrl={setUrl}
          setUsername={setUsername}
        />
      </Row>
    </Container>
  );
}
