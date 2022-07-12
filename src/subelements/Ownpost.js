import { useState } from "react"

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
            <img style= {styleObj} src= {post.photo}/> :

        </div>
    )
}

export default OwnPost