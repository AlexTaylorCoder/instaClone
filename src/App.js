import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { useContext, useEffect } from "react";

import CreateAccount from "./elements/Createaccount";
import Login from "./elements/Login";
import PostsPage from "./elements/PostsPage";
import Home from "./elements/Home";
import Profile from "./elements/Profile";
import BottomBar from "./components/Bottombar";
import EditProfile from "./subelements/EditProfile";

import { UserContext } from "./customHooks/userObj";

function App() {
  const location = useLocation();
  const { userObj, setuserObj } = useContext(UserContext);

  function validCallback(obj = "{}") {
    setuserObj(obj);
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!userObj || JSON.stringify(userObj) === "{}") {
      navigate("/login");
    } else if (location.pathname.includes("/profile")) {
      navigate(location.pathname);
    } else if (userObj) {
      navigate("/");
    }
  }, [userObj]);

  return (
    <div id="app-overall" >
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
        <Route path="/profile/edit" element={<EditProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;
