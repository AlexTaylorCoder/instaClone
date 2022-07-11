import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

function Login({ handleLogin, handleNewAccount }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(username, password);
  }
  return (
    <div id="loginpage">
      <Card style={{ width: "35%", margin: "60px auto" }}>
        <Card.Body>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-12">
              <label htmlFor="usernameLogin" className="form-label">
                Username:
              </label>
              <input
                type="text"
                id="usernamelogin"
                className="form-control form-control-lg"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="col-md-12">
              <label
                htmlFor="usernamePass"
                className="form-label form-label-lg"
              >
                Password:
              </label>
              <input
                type="password"
                id="usernamePass"
                className="form-control form-control-lg"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="col-12">
              <input type="submit" className="btn btn-primary" />
            </div>
          </form>
          <Card.Footer>
            <NavLink to="/CreateAccount">Create Account</NavLink>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
