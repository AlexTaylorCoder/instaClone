import handleLogin from "./handleLogin"

const userUrl = "http://localhost:3001/users"
const postHeader = {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    }
}

function postCreateUserAccount(returned,username,password) {
    const timeofCreation = new Date()
    return fetch(userUrl,{...postHeader,body:JSON.stringify({...returned,timeofCreation:timeofCreation})}).then(()=>handleLogin(username,password))

}

export default postCreateUserAccount