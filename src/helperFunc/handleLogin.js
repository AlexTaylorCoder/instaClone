import checkDB from "./checkDB"
const userUrl = "http://localhost:3001/users"

function handleLogin(username,password) {
    return checkDB(userUrl,{"username":username,"password":password})
  
}

export default handleLogin