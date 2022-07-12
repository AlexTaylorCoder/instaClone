<<<<<<< HEAD

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
=======
import { Routes, Route, useNavigate } from "react-router-dom";
>>>>>>> homefeed

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
  const location = useLocation()
  const {userObj, setuserObj} = useContext(UserContext)

  function validCallback(obj = "{}") {
    setuserObj(obj);
  }
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location)
    if (!userObj || JSON.stringify(userObj) === "{}") {
      navigate("/login");
    }
    else if(location.pathname.includes("/profile")) {
      navigate(location.pathname)
    }
    else if (userObj){
      navigate("/");   
    }

  }, [userObj]);
  
  return (
    <div id="App">
      <NavigationBar userObj={userObj} />
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/createpost" element={<PostsPage userObj={userObj} />} />
        <Route
          path="/login"
          element={<Login validCallback={validCallback} />}
        />
        <Route
          path="/createaccount"
          element={<CreateAccount validCallback={validCallback} />}
        />
        <Route path="/" element={<Home userObj={userObj} />} />
      </Routes>
    </div>
  );
}

export default App;
