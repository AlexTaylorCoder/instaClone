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
              backgroundImage:
                "url(https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?w=2000)",
            }}
          ></div>
          <h2>{post.userId}</h2>
        </div>
      </Card.Header>
      <Card.Img
        variant="top"
        src="https://cie.ucdavis.edu/sites/g/files/dgvnsk6861/files/styles/sf_profile/public/media/images/blank-headshot_15.png?h=345be249&itok=N-xKtfUn"
      />
      <div className="d-flex">
        <h1 className="p-2">
          <BsHeartFill />
        </h1>
        <h1 className="p-2">
          <FaRegComment />
        </h1>
      </div>
      <h5>20 Likes</h5>
      <div className="d-flex">
        <h4>adsfasd</h4>
        <h6>
          lorem ipsum adfa adfdasf kjls dkfjlkdjf sldkfj s dfklslkdjf sld
          flsdkfj sdlkfj sldkfj sdflkjn sdflkj sdlfkj
        </h6>
      </div>
      <Card.Text className="mb-2 text-muted">View Comments</Card.Text>
      <Card.Footer>add a comment</Card.Footer>
    </Card>
  );
}

export default Post;
