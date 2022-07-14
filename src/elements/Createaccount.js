import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import { useLocalStorage } from "../customHooks/uselocalstorage";
import handleNewAccount from "../helperFunc/handleNewAccount";

const allowedChar = /[^\w\b]|_/;
const allowedCharUser = /[^\w\b.$%&-]/;
const allowedCharPass = /[^\w\b.`~!@#$%^&*()_+=-?*]/;

function CreateAccount({ validCallback }) {
  const [inputs, setInputs] = useLocalStorage("accountobj", {
    fName: "",
    lName: "",
    birthday: "",
    username: "",
    password: "",
    picture: "",
    bioform: "",
  });

  function handleInput(e) {
    const input = e.target.value;
    let res = allowedChar.test(input);
    if (e.target.id === "password") {
      res = allowedCharPass.test(input) || input.length > 30;
    } else if (e.target.id === "username") {
      console.log(input.length);
      res = allowedCharUser.test(input) || input.length > 30;
    } else if(e.target.id === "picture") {
      res = false
    }
    
    else {
      res = false || input.length > 300;
    }

    if (!res) {
      setInputs({ ...inputs, [e.target.id]: e.target.value });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleNewAccount(inputs).then(validCallback);
  }
  return (
    <div className="create-account-card">
    <Card style={{ padding: "25px" }}>
    <img style={{margin:"0 auto"}}width="250px" height="auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"/>
      <Card.Body style={{ padding: "40px 70px" }}>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="fName" className="form-label">
              <p>First Name:</p>
            </label>
            <input
              required
              onChange={handleInput}
              value={inputs.fName}
              type="text"
              className="form-control"
              id="fName"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lName" className="form-label">
              <p>Last Name:</p>
            </label>
            <input
              required
              onChange={handleInput}
              value={inputs.lName}
              type="text"
              className="form-control"
              id="lName"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="birthday" className="form-label">
              Birthday:
            </label>
            <input
              required
              onChange={handleInput}
              value={inputs.birthday}
              type="date"
              className="form-control"
              id="birthday"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              required
              onChange={handleInput}
              value={inputs.username}
              type="text"
              className="form-control"
              id="username"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              required
              onChange={handleInput}
              value={inputs.password}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="picture" className="form-label">
              Profile Picture:{" "}
            </label>
            <input
              onChange={handleInput}
              value={inputs.picture}
              type="text"
              className="form-control"
              id="picture"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="bioform" className="form-label">
              Description:{" "}
            </label>
            <textarea
              onChange={handleInput}
              value={inputs.bioform}
              type="text"
              className="form-control"
              id="bioform"
            />
          </div>
            <button type="submit" className="btn btn-success btn-lg btn-block">
              Create Account
            </button>
        </form>
      </Card.Body>
      <Outlet />
    </Card>
    </div>
  );
}

export default CreateAccount;
