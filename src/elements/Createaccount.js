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
      res = allowedCharPass.test(input) || input.length < 12;
    } else if (e.target.id === "username") {
      console.log(input.length);
      res = allowedCharUser.test(input) || input.length > 5;
    } else {
      res = false || input.length > 120;
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
    <Card style={{ width: "40%", margin: "20px auto" }}>
      <Card.Body style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="fName" className="form-label">
              First Name:
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
              Last Name:
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
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
        </form>
      </Card.Body>
      <Outlet />
    </Card>
  );
}

export default CreateAccount;
