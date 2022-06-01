import React from "react";
import { useState ,useEffect} from "react";
import { Button, Modal, Form, Col, Row, InputGroup } from "react-bootstrap";
import axios from "axios";
function DeleteModal({accountData,
  setAccountData}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        handleClose();
      };
    return (
      <>
                        <Button
                    variant="outline-danger"
                    onClick={handleShow}
                  >
                    Delete
                  </Button>{" "}
                  <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={() => onDelete(accountData.accountId)}>
              Yes
            </Button>
            <Button variant="outline-success" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default DeleteModal;