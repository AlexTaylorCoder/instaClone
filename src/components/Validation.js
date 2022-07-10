import Login from "../elements/Login"
import CreateAccount from "../elements/Createaccount"
import { Link, Outlet} from "react-router-dom"
import checkDB from "../helperFunc/checkDB"

const userUrl = "http://localhost:3001/users"
const postHeader = {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    }
}


// function checkDB(...args) {
//     return fetch(userUrl).then(resp=>resp.json()).then(userData=>{
//             const filteredUsers = userData.filter(user=> {
//             for (let arg of args) {
//                 for (let prop in arg) {
//                     if (arg[prop]===user[prop]) {
//                         return true;
//                     }
//                 }
//             }
//             return false;

//         })
//         if (filteredUsers.length === 0) return false
//         return filteredUsers
//     })
// }



function Validation({validCallback}) {


    function handleNewAccount(returned) {
        //Check db to see if username is already taken, if not, set state
        const username = returned.username
        console.log(username)
       checkDB(userUrl,{"username":username}).then(resp=> {
            if (!resp) {
                postCreateUserAccount(returned)
            }
            else {
                console.log("username taken!")
            }
        })

       function postCreateUserAccount(returned) {
            const timeofCreation = new Date()
            fetch(userUrl,{...postHeader,body:JSON.stringify({...returned,timeofCreation:timeofCreation})}).then(()=>handleLogin(username,returned.password))

       }

    }
    function handleLogin(username,password) {

        checkDB(userUrl,{"username":username,"password":password}).then((check)=> {
            console.log(check)
            if (check) {
                validCallback(true,check[0])
            }
            else {
                validCallback(false)
            }
        })
      
    }
    //Default page is the login page. Router needed to handle create account link
    return (
        <div id = "validation">
                    {/* <Link to = "Login" state={{"handleLogin":handleLogin}}>login</Link>
                    <Link to = "createaccount" state={{"handleNewAccount":handleNewAccount}}>Create an account!</Link> */}
                <Login handleNewAccount={handleNewAccount} handleLogin={handleLogin}/> 
                {/* <CreateAccount handleNewAccount={handleNewAccount}/>  */}
            <Outlet />
        </div>
    )
}

export default Validation