import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import PostPopUpComment from "./PostPopUpComment";
import { Card } from "react-bootstrap";

function PostPopup({ show, onHide, comments, username, photo, profPic }) {
  const commentList = comments.map((comment, index) => (
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
      <div className="d-flex w-100 h-100">
        <img src={photo} className="w-50 h-auto" />
        <div className="d-flex flex-column flex-grow-1 p-2 align-items-start">
          <Modal.Header className="align-self-stretch">
            <div className="d-flex align-items-center">
              <div
                className="profile-picture"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundImage: "url(" + profPic + ")",
                }}
              ></div>
              <h2 className="m-2">{username}</h2>
            </div>
          </Modal.Header>

          <div className="flex-grow-1 m-2 overflow-auto">{commentList}</div>
        </div>
      </div>
    </Modal>
  );
}

export default PostPopup;
