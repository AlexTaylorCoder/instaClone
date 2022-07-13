import { useEffect, useState } from "react"
import OwnPost from "./Ownpost"
import { Row, Col} from "react-bootstrap"

function OwnPostContainer({posts=[]}) {
    
    const postList = posts.map(post=><OwnPost key = {post.id} post={post}/>)

    return (
        <div id = "ownpostcontainer">
            <Row style={{margin:"10px"}} sm = {8}>
            {postList}
            </Row>
        </div>
    )
    }

export default OwnPostContainer