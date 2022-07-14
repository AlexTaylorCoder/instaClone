import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import PostPopUpComment from "./PostPopUpComment";
import { Card } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

function PostPopup({ show, onHide, post }) {
  const commentList = post.comments.map((comment, index) => (
    <PostPopUpComment
      key={index}
      username={comment.username}
      profPic={comment.profPic}
      comment={comment.comment}
      timestamp={comment.timeStamp}
    />
  ));
  return (
    <Modal id="main-modal" show={show} onHide={onHide} centered>
      <div className="d-flex w-100" style={{ height: "75vh" }}>
        <div className="d-flex w-50 h-auto bg-black">
          <img
            src={post.photo}
            className="w-100 h-auto"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="d-flex flex-column flex-grow-1 p-2 align-items-start">
          <Modal.Header className="align-self-stretch">
            <div className="d-flex align-items-center">
              <div
                className="profile-picture"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundImage: "url(" + post.profPic + ")",
                }}
              ></div>
              <h2 className="m-2">{post.username}</h2>
            </div>
          </Modal.Header>

          <div className="flex-grow-1 m-2 overflow-auto align-self-stretch">
            <PostPopUpComment
              key={"captioncommentuniqueid"}
              username={post.username}
              profPic={post.profPic}
              comment={post.caption}
              timestamp={post.timeStamp}
            />
            {commentList}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostPopup;
