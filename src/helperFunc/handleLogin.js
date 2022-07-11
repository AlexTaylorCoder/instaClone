import checkDB from "./checkDB"
const userUrl = "http://localhost:3001/users"

function handleLogin(username,password) {
    checkDB(userUrl,{"username":username,"password":password}).then((check)=> {
        return check;
    })
  
}

export default handleLogin