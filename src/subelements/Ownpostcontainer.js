import { useEffect, useState } from "react"
import OwnPost from "./Ownpost"

function OwnPostContainer({id}) {

    const [posts,setPost] = useState([])
    useEffect(()=> {
        setPost([])
        fetch("http://localhost:3001/users/"+id).then(resp=>resp.json()).then(displayPosts)
    },[])

    function displayPosts(userData) {
        const postList = userData.posts.map(post=><OwnPost key = {post.id} post={post}/>)
        setPost(postList) 
        console.log(posts)

    }
    return (
        <div id = "ownpostcontainer">
            {posts}
        </div>
    )
}

export default OwnPostContainer