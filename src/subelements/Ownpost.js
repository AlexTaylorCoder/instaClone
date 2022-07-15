import { useState } from "react";
import { Col } from "react-bootstrap";
import { BsFillHeartFill, BsFillChatRightFill } from "react-icons/bs";
import PostPopup from "./PostPopup";

function OwnPost({ post }) {
  const [hover, setHover] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  function handleHover() {
    setHover(() => true);
  }
  function offHover() {
    setHover(() => false);
  }
  function handleExpand() {
    setModalShow(true);
  }
  return (
    <>
      <div className="own-post-img" onClick={handleExpand}>
        {hover ? (
          <p onMouseEnter={handleHover} className="overlay-text">
            <BsFillHeartFill className="icon-hover"/> {post.likes.length + "   "}
            <BsFillChatRightFill />
            {"  " + post.comments.length}{" "}
          </p>
        ) : (
          ""
        )}
        <img
          width="300px"
          height="300px"
          onMouseEnter={handleHover}
          onMouseLeave={offHover}
          className={hover ? "img-hover fit-img " : " fit-img"}
          src={post.photo}
        />
      </div>
      <PostPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        username={post.username}
        post={post}
      />
    </>
  );
}

export default OwnPost;
