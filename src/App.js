import Main from "./components/Main";
import Validation from "./components/Validation";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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
  const [userObj, setuserObj] = useState({});

  function validCallback(returned, obj = null) {
    setValid(() => returned);
    setuserObj(() => obj);
  }
  return (
    <div id="App">
      <Routes>
        <Route
          path="/"
          element={<Validation validCallback={validCallback} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<PostsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
