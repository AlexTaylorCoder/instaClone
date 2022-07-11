import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

import handleLogin from "../helperFunc/handleLogin";
import { useLocalStorage } from "../customHooks/uselocalstorage";

const cardstyleObj = { 
  width: "35%", 
  margin: "60px auto",
  padding: "150px 0"

 }

 const bottomcardstyleObj = {
  display:"flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
  padding: "10px"
 }

function Login({validCallback}) {

  const [username, setUsername] = useLocalStorage("username","");
  const [password, setPassword] = useLocalStorage("password","");

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(username, password).then(validCallback);
  }
  return (
    <div id="loginpage"style={cardstyleObj}>
      <img src=""/>
      <Card>
      <h1 style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Instaclone</h1>
        <Card.Body style = {{margin: "20px 40px", padding: "50px"}}>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-12">
              <input
                type="text"
                id="usernamelogin"
                className="form-control form-control-lg"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="col-md-12">
              <input
                type="password"
                id="usernamePass"
                className="form-control form-control-lg"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            </div>
            <div className="col-12">
              <input type="submit" className="btn btn-primary" />
            </div>
          </form>
        </Card.Body>
      </Card>
      <Card style={bottomcardstyleObj}>
        <Card.Body>
        <p>Dont have an account?<NavLink to="/CreateAccount"> Sign up</NavLink></p>

        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
