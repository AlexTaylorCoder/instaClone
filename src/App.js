import { Routes, Route, useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { useLocalStorage } from "./customHooks/uselocalstorage";

import CreateAccount from "./elements/Createaccount";
import Login from "./elements/Login";
import PostsPage from "./elements/PostsPage";
import Home from "./elements/Home";
import Profile from "./elements/Profile";
import BottomBar from "./components/Bottombar";
import NavigationBar from "./elements/Navbar";

import { UserContext } from "./customHooks/userObj";

function App() {
  const { userObj, setuserObj } = useContext(UserContext);

  function validCallback(obj = "{}") {
    setuserObj(obj);
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (userObj) {
      navigate("/");
    }
  }, [userObj]);

  useEffect(() => {
    if (JSON.stringify(userObj) === "{}") {
      navigate("/login");
    }
  }, []);

  return (
    <div id="App">
      <NavigationBar userObj={userObj} />
      <Routes>
        <Route path="/" element={<Home userObj={userObj} />} />
        <Route path="/profile" element={<Profile userObj={userObj} />} />
        <Route path="/createpost" element={<PostsPage userObj={userObj} />} />
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
