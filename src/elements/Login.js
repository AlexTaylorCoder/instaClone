import { useState } from "react"
import { useLocation,NavLink } from "react-router-dom"

function Login({handleLogin,handleNewAccount}) {
    
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        handleLogin(username,password)
    }
    return (
        <div id = "loginpage">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={e=>setUsername(e.target.value)}value={username}/>
                <input type="password"onChange={e=>setPassword(e.target.value)}value={password}/>
                <input type="submit"/>
            </form>
            <NavLink to = "CreateAccount">Create Account</NavLink>
        </div>
    )
}

export default Login