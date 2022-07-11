import checkDB from "./checkDB"
import postCreateUserAccount from "./postCreateUserAccount"
const userUrl = "http://localhost:3001/users"

function handleNewAccount(returned) {
    //Check db to see if username is already taken, if not, set state
    const username = returned.username
    const password = returned.password
    return checkDB(userUrl,{"username":username}).then(resp=> {
        if (!resp) {
            return postCreateUserAccount(returned,username,password)
        }
        else {
            console.log("username taken!")
        }
    })

}

export default handleNewAccount
