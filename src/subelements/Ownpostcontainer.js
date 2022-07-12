import { useEffect, useState } from "react"
import OwnPost from "./Ownpost"
import { Row } from "react-bootstrap"

function OwnPostContainer({posts=[]}) {
    
    const postList = posts.map(post=><OwnPost key = {post.id} post={post}/>)

    return (
        <div id = "ownpostcontainer">
            <Row sm = {4}>
            {postList}
            </Row>
        </div>
    )
    }

export default OwnPostContainer