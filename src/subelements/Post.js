import { Card } from "react-bootstrap";
import "../styles.css";
import { FaRegComment } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";

function Post({ post }) {
  return (
    <Card className="mx-auto m-3 w-50">
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
      <h5>{post.likes} Likes</h5>
      <div className="d-flex">
        <h4>{post.username}</h4>
        <h6>{post.caption}</h6>
      </div>
      <Card.Text className="mb-2 text-muted">View Comments</Card.Text>
      <Card.Footer>add a comment</Card.Footer>
    </Card>
  );
}

export default Post;
