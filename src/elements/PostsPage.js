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
      {imageUrl === "" ? (
        <Card className="mx-auto m-3 w-25">
          <Card.Header>Create new post</Card.Header>
          <Card.Body>
            <Card.Text>Upload your Photo here!</Card.Text>
            <Button variant="primary" onClick={handleShow}>
              Select Photo
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="mx-auto m-3 w-75">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <h4 onClick={() => setImageUrl("")}>
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
    </>
  );
}

export default PostsPage;
