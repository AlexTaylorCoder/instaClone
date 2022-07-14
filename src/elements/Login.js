import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

import handleLogin from "../helperFunc/handleLogin";
import { useLocalStorage } from "../customHooks/uselocalstorage";

function Login({validCallback}) {

  const [username, setUsername] = useLocalStorage("username","");
  const [password, setPassword] = useLocalStorage("password","");

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(username, password).then(validCallback);
  }
  return (
      <div id= "loginbox" className="login-in-card">
        <Card className = "post-box-shadow">
        <h1 className="center-insta-logo"><img width="auto" height="75px"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"/></h1>
          <Card.Body style = {{margin: "0 40px", padding: "0 50px 30px 50px"}}>
            <form onSubmit={handleSubmit} className="row g-3 ">
              <div className="col-md-12">
                <input required
                  type="text"
                  id="usernamelogin"
                  className="form-control" style={{backgroundColor:"#F5F5F5"}}
                  onChange={(e) => setUsername(e.target.value)} 
                  value={username}
                  placeholder="Username"
                />
              </div>
              <div className="col-md-12">
                <input required
                  type="password"
                  id="usernamePass"
                  className="form-control" style={{backgroundColor:"#F5F5F5"}}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                />
              </div>
                <input type="submit" className="btn btn-primary btn-sm" value="Login"/>
            </form>
          </Card.Body>
        </Card>
        <Card className="post-box-shadow"style={{marginTop:"10px"}}>
          <div className="bottomcardstyleObj">
          <p> Dont have an account?<NavLink to="/CreateAccount"> Sign up</NavLink></p>
          </div>
        </Card>
      </div>
  );
}

export default Login;
