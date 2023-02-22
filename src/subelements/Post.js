import { Button, Card } from "react-bootstrap";
import PostPopup from "../subelements/PostPopup";
import "../styles.css";
import { BsHeartFill, BsHeart, BsChatRight } from "react-icons/bs";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../customHooks/userObj";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import timeDiff from "../helperFunc/timeDiff";

function Post({ post = {}, addcomment }) {
  const [comment, setComment] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [likeButton, setLikeButton] = useState(false);
  const { userObj } = useContext(UserContext);
  const [totalLikes, setTotalLikes] = useState(post.likes.length);
  const [likeArray, setLikeArray] = useState(post.likes);
  const [totalComments, setToalComments] = useState(post.comments.length);

  function handleSubmit() {
    console.log(comment);
    if (comment) {
      addcomment(post, comment);
      setComment("");
      setToalComments((comments) => comments + 1);
    }
  }

  function onExpand(e) {
    setModalShow(true);
  }

  //Set likes
  useEffect(() => {
    if (
      //Check if liked post
      likeArray.filter((e) => {
        return e === userObj.id;
      }).length > 0
    ) {
      setLikeButton(true);
    } else {
      setLikeButton(false);
    }
  }, [likeArray]);

  function handleLike() {
    let tempPostLikes = [...likeArray];
    console.log(tempPostLikes)

    tempPostLikes.push(userObj.id);

    const postObj = { likes: tempPostLikes };

    //Handle like, like is represented by each user's id. Total likes = length
    fetch("http://localhost:3001/posts/" + post.id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postObj),
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalLikes((likes) => likes + 1);
        setLikeArray(tempPostLikes);
        setLikeButton(true);
      });
  }

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    //If index if found remove
    if (index > -1) {
      arr.splice(index, 1);
      return arr;
    }
  }

  function handleUnlike() {
    let tempPostLikes = removeItemOnce([...likeArray], userObj.id);

    const postObj = { likes: tempPostLikes };

    fetch("http://localhost:3001/posts/" + post.id, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postObj),
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalLikes((likes) => likes - 1);
        setLikeArray(tempPostLikes);
        setLikeButton(false);
      });
  }

  const navigate = useNavigate();

  return (
    <>
      <Card className="mx-auto m-3 w-50 post-box-shadow">
        <Card.Header style={{ backgroundColor: "white" }}>
          <div className="d-flex center-text post-header">
            <div
              onClick={() => navigate("/profile/" + post.userId)}
              className="profile-picture icon-hover"
              style={{
                width: "40px",
                height: "40px",
                backgroundImage: "url(" + post.profPic + ")",
              }}
            ></div>

            <p style={{ fontWeight: 600, marginTop: "5px" }}>{post.username}</p>
          </div>
        </Card.Header>
        <Card.Img variant="top" src={post.photo} />
        <div className="d-flex">
          <h4 className="p-2 icon-hover">
            {!likeButton ? (
              <BsHeart className="heart" onClick={handleLike} />
            ) : (
              <BsHeartFill onClick={handleUnlike} className="text-danger heart" />
            )}
          </h4>
          <h4 className="p-2 icon-hover">
            <BsChatRight onClick={onExpand} />
          </h4>
        </div>
        <Card.Body>
          <h5>{totalLikes} Likes</h5>
          <div className="d-flex center-text">
            <p>
              <b>{post.username}</b> {post.caption}
            </p>
          </div>
          <Card.Text onClick={onExpand} className="mb-2 text-muted">
            View all {totalComments} Comments
            <p style={{ fontSize: "11px" }} className={"mt-4"}>
              {timeDiff(post.timeStamp, true)}
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "white", padding: "5px 10px" }}>
          <InputGroup className="mb-3 bottomcardstyleObj">
            <Form.Control
              style={{ borderStyle: "none" }}
              placeholder="Add a comment..."
              aria-label="comment"
              aria-describedby="comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
            />
            <Button
              id={comment ? "input-active" : "post-button"}
              onClick={handleSubmit}
            >
              Post
            </Button>
          </InputGroup>
        </Card.Footer>
      </Card>
      <PostPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        post={post}
      />
    </>
  );
}

export default Post;
