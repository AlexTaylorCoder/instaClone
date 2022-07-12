import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "../subelements/SearchBar";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { RiAddBoxLine, RiAddBoxFill } from "react-icons/ri";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles.css";

function NavigationBar({ userObj }) {
  const [currentUrl, setCurrentUrl] = useState("");

  const location = useLocation();

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <div className="d-flex align-items-center">
            <h1>Fake</h1>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
              style={{
                width: "auto",
                height: "75px",
              }}
            ></img>
          </div>
        </Navbar.Brand>
        <SearchBar userObj={userObj} />

        <Nav className="me-auto">
          <Link to={"/"}>
            <h1>
              {location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
            </h1>
          </Link>
          <Link to={"/createpost"}>
            <h1>
              {location.pathname === "/createpost" ? (
                <RiAddBoxFill />
              ) : (
                <RiAddBoxLine />
              )}
            </h1>
          </Link>

          <Link to={"/profile"}>
            <h1>
              {location.pathname === "/profile" ? (
                <IoPerson />
              ) : (
                <IoPersonOutline />
              )}
            </h1>
          </Link>
        </Nav>
        <div
          className="profile-picture"
          style={{
            width: "50px",
            height: "50px",
            backgroundImage: "url(" + userObj.picture + ")",
          }}
        ></div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
