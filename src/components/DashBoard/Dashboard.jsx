import axios from "axios";
import React, { useState } from "react";
import InfoCard from "../InfoCard/InfoCard";
import NavBar from "../Navbar/NavBar";

export default function Dashboard() {
  const [accountId, setaccountId] = useState();
  const [accountData, setAccountData] = useState([]);
  const userToken = localStorage.getItem("userToken");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    setName("");
    setPassword("");
    setUrl("");
    setUsername("");
    setEdit(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleAppNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleEditChange = (id) => {
    //console.log("yes", accountData, accountId, id);
    if (accountData) {
      accountData.forEach((account) => {
        if (id === account.accountId) {
          setName(account.name);
          setPassword(account.password);
          setUrl(account.url);
          setUsername(account.username);
          setaccountId(id);
          // console.log("check", { account });
        }
      });
    }
    setEdit(true);
    setShow(true);
  };

  const handleSubmit = async (event) => {
    let account = {
      username,
      name,
      password,
      url,
      id: accountId,
    };
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        console.log({ edit });
        // if !edit call this
        if (!edit) {
          const response = await axios.post(
            `http://localhost:8080/accounts`,
            account,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log("successfully added account", response);
        } else {
          console.log("check", { account });
          const response = await axios.put(
            `http://localhost:8080/accounts`,
            account,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log("successfully edited account", response);
        }

        // else call edit api
        //console.log({ response });
        setEdit(false);
        setShow(false);
        window.location.reload();
      } catch (error) {
        console.log({ error });
        return error;
      }
    }
  };

  return (
    <div>
      <NavBar
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
      <InfoCard
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
        edit={edit}
        setEdit={setEdit}
        handleEditChange={handleEditChange}
        setName={setName}
        setPassword={setPassword}
        setUrl={setUrl}
        setUsername={setUsername}
        accountData={accountData}
        setAccountData={setAccountData}
      />
    </div>
  );
}
