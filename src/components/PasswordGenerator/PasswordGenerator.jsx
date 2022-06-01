import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./PasswordGenerator.css";
const string = "abcdefghijklmnopqrstuvwxyz";
const numeric = "0123456789";
const punctuation = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
export default function PasswordGenerator() {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState("");
  return (
    <div className="password">
      {/* <form onSubmit={generatePassword}> */}
      <div style={{display:"flex",verticalAlign:"center",justifyContent:"center",alignContent:"center",marginBottom:"10px"}}>
        <div style={{marginRight:"20px"}}>
          <label style={{marginRight:"10px"}}><b>Length</b></label>
          <input value={length} onChange={(e) => setLength(e.target.value)} size={1}/>
        </div>
        <button style={{padding:"3px",height:"30px", border:"1px solid green"}} type="submit" variant="outlined-success" onClick={(e)=>{
            e.preventDefault();
            const formValid = +length > 0;
            if (!formValid) {
              return;
            }
            let character = "";
            let password = "";
            while (password.length < length) {
              const entity1 = Math.ceil(string.length * Math.random() * Math.random());
              const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
              const entity3 = Math.ceil(
                punctuation.length * Math.random() * Math.random()
              );
              let hold = string.charAt(entity1);
              hold = password.length % 2 === 0 ? hold.toUpperCase() : hold;
              character += hold;
              character += numeric.charAt(entity2);
              character += punctuation.charAt(entity3);
              password = character;
            }
            password = password
              .split("")
              .sort(() => {
                return 0.5 - Math.random();
              })
              .join("");
            setPassword(password.substr(0, length));
        }}>Generate</button>
    </div>
      {/* </form> */}
      <div className="Background" style={{display:"flex"}}><p><b>Generated Password :</b></p> <p style={{color:"green"}}><b>&nbsp;{password}</b></p></div>
      <Button style={{margin:"10px"}}
                  variant="outline-primary"
                  onClick={() =>
                    navigator.clipboard.writeText(password)
                  }
                >
                  Copy
                </Button>{" "}</div>
    
  );
}