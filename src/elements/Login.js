import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

import handleLogin from "../helperFunc/handleLogin";
import { useLocalStorage } from "../customHooks/uselocalstorage";

const cardstyleObj = { 
  width: "30%", 
  margin: "60px auto",
 }

 const bottomcardstyleObj = {
  display:"flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
  padding: "5px",
  width: "400px"
 }

function Login({validCallback}) {

  const [username, setUsername] = useLocalStorage("username","");
  const [password, setPassword] = useLocalStorage("password","");

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(username, password).then(validCallback);
  }
  return (
    <div id="loginpage"style={{width:"100%",height:"100%"}}>
      <div id= "loginbox"style={cardstyleObj}>
        <img src=""/>
        <Card style={{borderRadius:0,height:"350px",width:"400px"}}>
        <h1 style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"30px"}}>Instaclone</h1>
          <Card.Body style = {{margin: "0 40px", padding: "0 50px 30px 50px"}}>
            <form onSubmit={handleSubmit} className="row g-3">
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
        <Card style={bottomcardstyleObj}>
          <p>Dont have an account?<NavLink to="/CreateAccount"> Sign up</NavLink></p>
        </Card>
      </div>
    </div>
  );
}

export default Login;
