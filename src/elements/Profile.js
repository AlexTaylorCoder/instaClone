import { Button } from "react-bootstrap";
import OwnPostContainer from "../subelements/Ownpostcontainer";
import OwnPost from "../subelements/Ownpost";

import {Row,Col,Container,ListGroup} from "react-bootstrap";
import {BsGearWide} from "react-icons/bs"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../customHooks/userObj";
// import checkDB from "../helperFunc/checkDB";
import { useNavigate, useParams, useRoute } from "react-router-dom";

const styleObj = {
  display:"flex",
  flexDirection:"column",
}


function Profile() {
  const {userObj, setuserObj} = useContext(UserContext)

  const params = useParams()
  const navigate = useNavigate()

  const [logoutDrop,setlogoutDrop] = useState(false)
  const [localuserObj,setlocaluserObj] = useState({})


  useEffect(()=> {
    fetch("http://localhost:3001/users/"+params.id).then(resp=>resp.json()).then(data=> setlocaluserObj(data))
  },[])

  const {fName, bioForm, lName, picture, username, followers, following,id} = localuserObj


  function handleLogOutToggle() {
    console.log("click")
    setlogoutDrop((logoutDrop)=>!logoutDrop)
  }
  function handleLogOut() {
    setuserObj({})
    navigate("/login");
    setlocaluserObj({})
  }

  return (
  <div id="profile" style={{margin: "30px 200px 10px 350px"}}>

    <Container>
      <Row>
        <Col sm = {{span:3}}><img width={150} height={150} style={{borderRadius:"50%"}}src = {picture}/></Col>
            <Col style={styleObj} xs = {{span:2}}>
              <p style={{fontSize: "1.75em", fontWeight: "lighter"}}>{username}</p>
              <p><b></b>Posts</p>
              <section style ={{marginTop:"15px"}}>
                <b>{fName} {lName}</b>
                <p>{bioForm}</p>
              </section>       
            </Col>

            <Col style={styleObj} xs= {{span:2}}>
              <Button style={{width:"50%", marginBottom:"8px"}}variant="outline-secondary" size="sm">Edit</Button>
              <p><b></b>followers</p>
            </Col>
            <Col style={styleObj} xs= {{span:2}}>
            <BsGearWide onClick={handleLogOutToggle}style={{margin: "5px 0 15px 0"}}/>  
            {logoutDrop ?
            <ListGroup style={{position:"absolute",margin: "0 0 0 20px"}}>
              <ListGroup.Item active onClick={handleLogOut}>Log Out</ListGroup.Item>
            </ListGroup>
            : null
            }
            <p><b></b> following</p>
            </Col>
      </Row>
      <hr />
    </Container>
    {/* <OwnPostContainer id = {id}/> */}
  </div>
  );
}

export default Profile;
