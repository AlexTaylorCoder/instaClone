import { Card } from "react-bootstrap";
import PostPopup from "../subelements/PostPopup"
import "../styles.css";
import { FaRegComment } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { useState } from "react";


function Post({ post=[],addcomment}) {
    const [comment, setComment] = useState("")
    const [modalShow, setModalShow] = useState(false);

    function handleInput(e) {
        setComment(e.target.value)
    }

    function handleSubmit() {
        addcomment(post,comment)
    }
    function onExpand(e) {
        setModalShow(true)
        console.log(e.target)
    }
  return (
    <>
    <Card style = {{borderRadius:"10px"}}className="mx-auto m-3 w-50">
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
          <BsHeartFill />
        </h1>
        <h1 className="p-2">
          <FaRegComment />
        </h1>
      </div>
      <Card.Body>
      <h5>{post.likes} Likes</h5>
      <div className="d-flex center-text">
        <p><b>{post.username}</b> {post.caption}</p>
      </div>
      <Card.Text onClick={onExpand} className="mb-2 text-muted">View all {post.comments.length} Comments</Card.Text>
      </Card.Body>
      <Card.Footer style={{backgroundColor:"white", padding:"5px"}}>
        <input value={comment} onChange={handleInput}className = "inputNone" type="text"placeholder="Add a comment..."/>
        <p onClick = {handleSubmit}className="postFooter ">Post</p>  
      </Card.Footer>
    </Card>
    <PostPopup show={modalShow} onHide={() => setModalShow(false)} username={post.username}comments = {post.comments} photo = {post.photo} profPic={post.profPic}/>
    </>
  );
}

export default Post;
