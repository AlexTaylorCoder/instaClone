import { Button } from "react-bootstrap";
import OwnPostContainer from "../subelements/Ownpostcontainer";
import {Row,Col,Container} from "react-bootstrap";

const styleObj = {
  display:"flex",
  flexDirection:"column",
}

function Profile() {
  return (
  <div id="profile" style={{margin: "100px 200px 10px 350px"}}>

    <Container>
      <Row>
        <Col sm = {{span:3}}><img width={150} height={150} style={{borderRadius:"50%"}}src = "https://www.nynmedia.com/sites/default/files/all/nyn-placeholder-250x250.png"/></Col>
            <Col style={styleObj} xs = {{span:2}}>
              <p>Account Name</p>
              <p><b>num </b>Posts</p>
              <section style ={{marginTop:"15px"}}>
                <b>Name</b>
                <p>Bio</p>
              </section>       
            </Col>

            <Col style={styleObj} xs= {{span:2}}>
              <Button style={{width:"50%", marginBottom:"8px"}}variant="outline-secondary" size="sm">Edit</Button>
              <p><b>num </b>Followers</p>
            </Col>
            <Col style={styleObj} xs= {{span:2}}>
            <p>Placeholder </p>          
            <p><b>num </b>Following</p>
            </Col>
      </Row>
      <hr />


    </Container>
  </div>
  );
}

export default Profile;
