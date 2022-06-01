import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function EditPassword() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  useEffect(() => {
    setName(localStorage.getItem(""));
  }, []);

  const updateAPIData = () => {
    axios
      .put(
        `https://shradha-deloitte.github.io/dummy-data/Data/dummy.json/${name}`,
        {
          name,
        }
      )
      .then(() => {
        navigate("/");
      });
  };
  return (
    <div>
      <Form>
        <label>First Name</label>
        <input
          placeholder="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
}

export default EditPassword;
