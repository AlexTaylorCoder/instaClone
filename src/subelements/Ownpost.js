import { useState } from "react"
import { Col } from "react-bootstrap"

const styleObj = {
    margin: "30px 20px",
    float:"left",
    width: "300px",
    height: "300px"

}

function OwnPost({post}) {
    const [hover, setHover] = useState(false)

    function handleHover() {
        setHover(hover=>!hover)
    }
    return (
        
        <div onMouseEnter={handleHover}className = "ownPost">
            <Col style={{margin:10}}>
                <img style= {styleObj} src= {post.photo}/> 
            </Col>

        </div>
    )
}

export default OwnPost