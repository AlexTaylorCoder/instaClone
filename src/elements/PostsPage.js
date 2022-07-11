import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import CardGroup from "react-bootstrap/CardGroup";
import Image from "react-bootstrap/Image";
import "../styles.css";
import InputGroup from "react-bootstrap/InputGroup";

function PostsPage() {
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.formImageUrl.value);
    handleClose();
    setImageUrl(e.target.formImageUrl.value);
  }
  return (
    <>
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
              <h4 onClick={() => setImageUrl("")}>Back</h4>
              <h3>Create new post</h3> <Button variant="primary">Post</Button>
            </div>
          </Card.Header>
          <div class="d-flex">
            <img src={imageUrl} className="w-50 h-auto" />
            <div className="d-flex flex-column flex-grow-1 p-2 align-items-start">
              <div className="d-flex align-items-center">
                <div
                  className="profile-picture"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundImage:
                      "url(https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?w=2000)",
                  }}
                ></div>
                <h2 className="m-2">username</h2>
              </div>
              <InputGroup className="flex-grow-1 m-2">
                <Form.Control
                  as="textarea"
                  aria-label="textarea"
                  placeholder="Write a caption..."
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
