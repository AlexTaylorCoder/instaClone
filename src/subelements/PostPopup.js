import { Modal,Button, Container,Row,Col } from "react-bootstrap"
import PostPopUpComment from "./PostPopUpComment"

function PostPopup({show,onHide,comments, username,photo, profPic}) {
    
    const commentList = comments.map((comment,index)=><PostPopUpComment key = {index} username={comment.username} 
    profPic={comment.profPic}comment={comment.comment} timestamp={comment.timeStamp}/> )
    return (
        <Modal id = "main-modal"
        show={show}
        onHide={onHide}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Row>
            <Col md = {6}>
                <img className="pic-container" width= "600px" height="auto"src={photo}/>
            </Col>
            <Col md = {6}>
                <PostPopUpComment username={username} profPic={profPic} />
                <hr/>
                {commentList}

            </Col>
        </Row>
      </Modal>
    )
}

export default PostPopup
