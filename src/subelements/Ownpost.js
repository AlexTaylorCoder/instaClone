import { useState } from "react"
import { Col } from "react-bootstrap"
import { BsFillHeartFill } from "react-icons/bs"
import {MdOutlineModeComment} from "react-icons/md"
import PostPopup from "./PostPopup"



function OwnPost({post}) {

    const [hover, setHover] = useState(false)
    const [modalShow, setModalShow] = useState(false);

    function handleHover() {
        setHover(()=>true)
        
    }
    function offHover() {
        setHover(()=>false)
    }
    function handleExpand() {
        setModalShow(true)
    }
    return (
        <>
        <Col style={{margin:10}}>
            <div className="pic-container absolute-pos" onClick = {handleExpand}>
            {hover ? <p onMouseEnter={handleHover}
            className="overlay-text"><BsFillHeartFill /> {post.likes}   
            <MdOutlineModeComment />{post.comments.length} </p> : ""}
                <img onMouseEnter={handleHover} onMouseLeave={offHover} className = {hover ? "img-hover own-post-img": "own-post-img"} src= {post.photo}/> 
            </div>

        </Col>
        <PostPopup show={modalShow} 
            onHide={() => setModalShow(false)} username={post.username}comments = {post.comments} photo = {post.photo} profPic={post.profPic}/>
        </>

    )
}

export default OwnPost