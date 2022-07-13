import { Card } from "react-bootstrap";
import PostPopup from "../subelements/PostPopup";
import "../styles.css";
import { FaRegComment } from "react-icons/fa";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../customHooks/userObj";

function Post({ post = {}, addcomment }) {
  const [comment, setComment] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [likeButton, setLikeButton] = useState(false);
  const { userObj, setuserObj } = useContext(UserContext);
  const [totalLikes, setTotalLikes] = useState(post.likes.length);

  function handleInput(e) {
    setComment(e.target.value);
  }

  function handleSubmit() {
    addcomment(post, comment);
  }
  function onExpand(e) {
    setModalShow(true);
    console.log(e.target);
  }

  useEffect(() => {
    if (
      post.likes.filter((e) => {
        return e === userObj.id;
      }).length > 0
    ) {
      setLikeButton(true);
    } else {
      setLikeButton(false);
    }
  }, []);

  function handleLike() {
    let tempPostLikes = [...post.likes];

    tempPostLikes.push(userObj.id);

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
        setTotalLikes((likes) => likes + 1);

        setLikeButton(true);
      });
  }

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  function handleUnlike() {
    let tempPostLikes = removeItemOnce([...post.likes], userObj.id);

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
        setLikeButton(false);
      });
  }

  return (
    <>
      <Card style={{ borderRadius: "10px" }} className="mx-auto m-3 w-50">
        <Card.Header>
          <div className="d-flex">
            <div
              className="profile-picture"
              style={{
                width: "50px",
                height: "50px",
                backgroundImage: "url(" + post.profPic + ")",
              }}
            ></div>
            <h2>{post.username}</h2>
          </div>
        </Card.Header>
        <Card.Img variant="top" src={post.photo} />
        <div className="d-flex">
          <h1 className="p-2">
            {!likeButton ? (
              <BsHeart onClick={handleLike} />
            ) : (
              <BsHeartFill onClick={handleUnlike} />
            )}
          </h1>
          <h1 className="p-2">
            <FaRegComment />
          </h1>
        </div>
        <Card.Body>
          <h5>{totalLikes} Likes</h5>
          <div className="d-flex center-text">
            <p>
              <b>{post.username}</b> {post.caption}
            </p>
          </div>
          <Card.Text onClick={onExpand} className="mb-2 text-muted">
            View all {post.comments.length} Comments
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "white", padding: "5px" }}>
          <input
            value={comment}
            onChange={handleInput}
            className="inputNone"
            type="text"
            placeholder="Add a comment..."
          />
          <p onClick={handleSubmit} className="postFooter ">
            Post
          </p>
        </Card.Footer>
      </Card>
      <PostPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        username={post.username}
        comments={post.comments}
        photo={post.photo}
        profPic={post.profPic}
      />
    </>
  );
}

export default Post;
