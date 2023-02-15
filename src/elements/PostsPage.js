import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../styles.css";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import NavigationBar from "./Navbar";

function PostsPage({ userObj }) {

  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    handleClose();
    setImageUrl(e.target.formImageUrl.value);
  }

  function handlePost() {
    let tempObj = {
      caption: caption,
      photo: imageUrl,
      timeStamp: Date.now(),
      userId: userObj.id,
      profPic: userObj.picture,
      username: userObj.username,
      likes: [],
      comments: [],
    };

    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(tempObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  }

  return (
    <>
      <NavigationBar userObj={userObj} />
      <div className="post-page">
      {imageUrl === "" ? (
        <Card style={{borderRadius:"10px"}}className="mx-auto m-3 w-25 text-center post-box-shadow">
          <Card.Header style={{backgroundColor:"white"}}>
            <b>Create new post</b>
          </Card.Header>
          <Card.Body>
            <Card.Text>Upload your Photo here!</Card.Text>
            <div className="m-4">
              <svg
                aria-label="Icon to represent media such as images or videos"
                color="#262626"
                fill="#262626"
                height="77"
                role="img"
                viewBox="0 0 97.6 77.3"
                width="96"
              >
                <path
                  d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                  fill="currentColor"
                ></path>
                <path
                  d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                  fill="currentColor"
                ></path>
                <path
                  d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <Button variant="primary" className="m-4" onClick={handleShow}>
              Select Photo
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="mx-auto m-3 w-75">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <h4 className="icon-hover" onClick={() => setImageUrl("")}>
                <FaChevronLeft />
              </h4>
              <h3>Create new post</h3>{" "}
              <Button variant="primary" onClick={handlePost}>
                Post
              </Button>
            </div>
          </Card.Header>
          <div className="d-flex">
            <img src={imageUrl} className="w-50 h-auto" />
            <div className="d-flex flex-column flex-grow-1 p-2 align-items-start">
              <div className="d-flex align-items-center">
                <div
                  className="profile-picture"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundImage: "url(" + userObj.picture + ")",
                  }}
                ></div>
                <h2 className="m-2">{userObj.username}</h2>
              </div>
              <InputGroup className="flex-grow-1 m-2">
                <Form.Control
                  as="textarea"
                  aria-label="textarea"
                  placeholder="Write a caption..."
                  onChange={(e) => setCaption(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>
        </Card>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formImageUrl">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" placeholder="Enter Image Url" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      </div>
    </>
  );
}

export default PostsPage;
