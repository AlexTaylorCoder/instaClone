import checkDB from "./checkDB"
const userUrl = "http://localhost:3001/users"
// const postUrl = "http://localhost:3001/posts"

function handleLogin(username,password) {
    return checkDB(userUrl,{"username":username,"password":password})
  
}

export default handleLogin