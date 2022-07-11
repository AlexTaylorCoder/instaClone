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

function App() {
  const [cookies, setCookie] = useCookies("");
  const [valid, setValid] = useState(false);
  const [userObj, setuserObj] = useState({
    fName: "Derek",
    lName: "Vogt",
    birthday: "2022-07-15",
    username: "derekvogt",
    password: "derekvogt",
    picture:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
    followers: [
      {
        username: "alextaylor",
        id: 2,
        picture:
          "https://static.wikia.nocookie.net/monster/images/6/6e/DragonRed.jpg/revision/latest/scale-to-width-down/1200?cb=20160809235604",
      },
    ],
    following: [
      {
        username: "alextaylor",
        id: 2,
        picture:
          "https://static.wikia.nocookie.net/monster/images/6/6e/DragonRed.jpg/revision/latest/scale-to-width-down/1200?cb=20160809235604",
      },
    ],
    id: 1,
    timeStamp: 1655821248892,
    bio: "this is the bio for derek",
  });

  function validCallback(returned, obj = null) {
    setValid(() => returned);
    setuserObj(() => obj);
  }
  const navigate = useNavigate();

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
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
      </Routes>
    </div>
  );
}

export default App;
