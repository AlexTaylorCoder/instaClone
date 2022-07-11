import Main from "./components/Main";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CreateAccount from "./elements/Createaccount";
import Login from "./elements/Login";
import PostsPage from "./elements/PostsPage";
import Home from "./elements/Home";
import NavBar from "./elements/Navbar";
import { useCookies } from "react-cookie";
import Profile from "./elements/Profile";
import { useLocalStorage } from "./customHooks/uselocalstorage";

function App() {
  const [cookies, setCookie] = useCookies("");
  // const [valid, setValid] = useState(false);
  const [userObj, setuserObj] = useLocalStorage("userObj", {});

  function validCallback(obj = "{}") {
    // setValid(() => returned);
    setuserObj(() => obj);
  }
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [userObj]);
  useEffect(() => {
    //get cookies and set to the setUserObj but for now hardcode use state
    if (JSON.stringify(userObj) === "{}") {
      navigate("/login");
    }
  }, []);

  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<PostsPage />} />
        <Route
          path="/login"
          element={<Login validCallback={validCallback} />}
        />
        <Route
          path="/createaccount"
          element={<CreateAccount validCallback={validCallback} />}
        />
      </Routes>
    </div>
  );
}

export default App;
