import Main from "./components/Main";
import Validation from "./components/Validation";
import Footer from "./components/Footer";
import { Routes,Route} from "react-router-dom";
import { useState } from "react";
import CreateAccount from "./elements/Createaccount";
import Login from "./elements/Login";
import PostsPage from "./elements/PostsPage"
import Home from "./elements/Home";
import NavBar from "./elements/Navbar";
import { useCookies } from "react-cookie";


function App() {
  const [cookies, setCookie] = useCookies('')
  const [valid,setValid] = useState(false)
  
  function validCallback(returned) {
    setValid(()=>returned)
    setCookie('valid',valid, {path: '/'})
    console.log(cookies)
  }
  return (
    <div id="App">
      <Routes>
        
        <Route path="validation" element={<Validation/>}/>
 
      </Routes>
      <Footer/> 
            
    </div>
  );
}

export default App;
