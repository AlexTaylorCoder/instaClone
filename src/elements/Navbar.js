import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "../subelements/SearchBar";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { RiAddBoxLine, RiAddBoxFill } from "react-icons/ri";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import {CgProfile} from "react-icons/cg"
import { useLocation } from "react-router-dom";
import "../styles.css";
import { useContext } from "react";
import {UserContext} from "../customHooks/userObj"
import {Popover,OverlayTrigger, ListGroup }from "react-bootstrap";


function NavigationBar({ userObj }) {

  const location = useLocation();

  function handleDropDown() {
    console.log("e")
  }
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <Link to={""}>
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
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <SearchBar userObj={userObj} />
        </Nav>
        <Link to={"/"}>
          <h1 className="mx-2">
            {location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
          </h1>
        </Link>
        <Link to={"/createpost"}>
          <h1 className="mx-2">
            {location.pathname === "/createpost" ? (
              <RiAddBoxFill />
            ) : (
              <RiAddBoxLine />
            )}
          </h1>
        </Link>

        <Link to={`/profile/${userObj.id}`}>
          <h1 className="mx-2">
            {location.pathname === "/profile" ? (
              <IoPerson />
            ) : (
              <IoPersonOutline />
            )}
          </h1>
        </Link>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <div
          className="profile-picture mx-5" onClick={handleDropDown}
          style={{
            width: "50px",
            height: "50px",
            backgroundImage: "url(" + userObj.picture + ")",
          }}
        ></div>
        </OverlayTrigger>
      </Container>
    </Navbar>
  );
}

const popover = (
  
  <Popover id="popover-basic">
    <ListGroup>
      <Popover.Body className = "blueHov">
        <CgProfile/> Profile
      </Popover.Body>
      <ListGroup.Item className="blueHov">
      Log Out</ListGroup.Item>
    </ListGroup>
  </Popover>
);

export default NavigationBar;
