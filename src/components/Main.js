import NavBar from "../elements/Navbar"
import Home from "../elements/Home"
import PostsPage from "../elements/Posts"
import Profile from "../elements/Profile"

function Main() {

    return (
        <div id = "main">
            <NavBar/>
            <Home/>
            <PostsPage/>
            <Profile/>
        </div>
    )
}

export default Main