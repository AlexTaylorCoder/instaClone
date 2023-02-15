import { Button } from "react-bootstrap";
import OwnPostContainer from "../subelements/Ownpostcontainer";
import NavigationBar from "./Navbar";
import { Row, Col, Container, ListGroup, Modal } from "react-bootstrap";
import { BsGearWide } from "react-icons/bs";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../customHooks/userObj";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
const styleObj = {
  display: "flex",
  flexDirection: "column",
};
function Profile() {
  //get main user object
  const { userObj, setuserObj } = useContext(UserContext);
  //get params, will be id to get the user
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  //handle modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [localuserObj, setlocaluserObj] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);

  //Fetch user data
  //Could be made more efficient user's own profile by checking if context id (user id) equals params id (url id)
  useEffect(() => {
    if (params.id !== userObj.id) {
      fetch("http://localhost:3001/users/" + params.id)
        .then((resp) => resp.json())
        .then((data) => {
          setlocaluserObj(data);
          if (
            userObj.following.filter((e) => {
              return e.id === data.id;
            }).length > 0
          ) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        });
    }
  }, [params.id]);
  const {
    fName,
    bioform,
    lName,
    picture,
    username,
    followers = 0,
    following = 0,
    posts=[],
  } = localuserObj;
  function handleLogOut() {
    handleClose();
    setuserObj({});
    navigate("/login");
    setlocaluserObj({});
  }

  function handleFollow() {
    const currentUserArray = [
      ...userObj.following,
      {
        username: localuserObj.username,
        id: localuserObj.id,
        picture: localuserObj.picture,
      },
    ];
    const followedUserArray = [
      ...localuserObj.followers,
      {
        username: userObj.username,
        id: userObj.id,
        picture: userObj.picture,
      },
    ];
    const currentUserObj = { following: currentUserArray };
    const followedUserObj = { followers: followedUserArray };
    //update the current users followers
    fetch("http://localhost:3001/users/" + userObj.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(currentUserObj),
    })
      .then((res) => res.json())
      .then((data) => {
        setuserObj(data);
        setIsFollowing(true);
      });
    //update the followed users followers
    fetch("http://localhost:3001/users/" + localuserObj.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(followedUserObj),
    })
      .then((res) => res.json())
      .then((data) => {
        const tempUserObj = { posts: localuserObj.posts, ...data };
        setlocaluserObj(tempUserObj);
      });
  }
  function handleUnfollow() {
    const currentUserArray = userObj.following.filter((follow) => {
      if (follow.id === localuserObj.id) {
        return false;
      } else {
        return true;
      }
    });
    const followedUserArray = localuserObj.followers.filter((follower) => {
      if (follower.id === userObj.id) {
        return false;
      } else {
        return true;
      }
    });
    const currentUserObj = { following: currentUserArray };
    const followedUserObj = { followers: followedUserArray };
    //update the current users followers
    fetch("http://localhost:3001/users/" + userObj.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(currentUserObj),
    })
      .then((res) => res.json())
      .then((data) => {
        setuserObj(data);
        setIsFollowing(false);
      });
    //update the followed users followers
    fetch("http://localhost:3001/users/" + localuserObj.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(followedUserObj),
    })
      .then((res) => res.json())
      .then((data) => {
        const tempUserObj = { posts: localuserObj.posts, ...data };
        setlocaluserObj(tempUserObj);
      });
  }
  console.log(params.id, userObj.id)
  return (
    <>
      <NavigationBar userObj={userObj} />
      <div id="profile" style={{ margin: "30px 200px 10px 350px" }}>
        <Container>
          <Row>
            <Col sm={{ span: 3 }}>
              <img
                alt = "Profile"
                className="fit-img"
                width={150}
                height={150}
                style={{ borderRadius: "50%" }}
                src={picture}
              />
            </Col>
            <Col style={styleObj} xs={{ span: 2 }}>
              <p style={{ fontSize: "1.75em", fontWeight: "lighter" }}>
                {username}
              </p>
              <p>
                <b>{posts.length}</b> Posts
              </p>
              <section style={{ marginTop: "15px" }}>
                <b>
                  {fName} {lName}
                </b>
                <p>{bioform}</p>
              </section>
            </Col>
            <Modal centered show={show} onHide={handleClose}>
              <ListGroup>
                <ListGroup.Item className = "list-item"onClick={handleLogOut}>Log Out</ListGroup.Item>
                <Link to = {"/profile/edit"}> <ListGroup.Item className = "list-item">Edit Account</ListGroup.Item> </Link>
              </ListGroup>
            </Modal>
            {/* Param is string b/c from url userobj is int so compared with == */}
            {params.id == userObj.id ? (
              <>
                <Col style={styleObj} xs={{ span: 2 }}>
                  <Link to="/profile/edit">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      style={{ width: "50%", marginBottom: "15px" }}
                    >
                      Edit
                    </button>
                  </Link>
                  <p>                  
                    <b>{followers.length}</b> followers
                  </p>
                </Col>
                <Col style={styleObj} xs={{ span: 2 }}>
                  <h4>
                    <BsGearWide className="icon-hover"
                      onClick={handleShow}
                      style={{ margin: "5px 0 15px 0" }}
                    />
                  </h4>
                  <p>
                    <b>{following.length}</b> following
                  </p>
                </Col>
              </>
            ) : (
              <>
                <Col style={styleObj} xs={{ span: 2 }}>
                  {!isFollowing ? (
                    <Button
                      style={{ width: "50%", marginBottom: "8px" }}
                      variant="primary"
                      size="sm"
                      onClick={handleFollow}
                    >
                      follow
                    </Button> 
                  ) : (
                    <Button
                      style={{ width: "50%", marginBottom: "8px" }}
                      variant="secondary"
                      size="sm"
                      onClick={handleUnfollow}
                    >
                      unfollow
                    </Button>
                  )}
                  <p>
                    <b></b>
                    {followers.length} followers
                  </p>
                </Col>
                <Col style={styleObj} xs={{ span: 2 }}>
                  <div style={{ height: "40px" }}></div>
                  <b></b>
                  <p>
                    <b></b>
                    {following.length} following
                  </p>
                </Col>
              </>
            )}
          </Row>
          <hr />
        </Container>
        <OwnPostContainer posts={posts} />
      </div>
    </>
  );
}
export default Profile;
