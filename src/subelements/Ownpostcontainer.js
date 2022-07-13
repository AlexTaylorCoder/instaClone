import { useEffect, useState } from "react"
import OwnPost from "./Ownpost"
import { Row, Col, Container} from "react-bootstrap"

function OwnPostContainer({posts=[]}) {
    
    const postList = posts.map(post=><OwnPost key = {post.id} post={post}/>)

    return (
        <div id = "img-grid-prof">
            {postList}
        </div>
    )
}

export default OwnPostContainer