import { useState } from "react";
import { Card } from "react-bootstrap"
import { Outlet,useLocation } from "react-router-dom";

const allowedChar = /[^\w\b]|_/
const allowedCharUser = /[^\w\b.$%&-]/
const allowedCharPass = /[^\w\b.`~!@#$%^&*()_+=-?*]/


function CreateAccount({handleNewAccount}) {
  
    const [inputs,setInputs] = useState({
        fName:"",
        lName:"",
        birthday:"",
        username:"",
        password:"",
        picture:"",

    })

    function handleInput(e) {
        let res = allowedChar.test(e.target.value)
        if (e.target.id === "password") {
            res = allowedCharPass.test(e.target.value)
        }
        else if (e.target.id === "username") {
            res = allowedCharUser.test(e.target.value)
        }
        else if(e.target.id==="birthday" || e.target.id==="picture") {
            res = false
        }


        if (!res) {
            setInputs(
                {...inputs, [e.target.id]:e.target.value}
            )     
        }
    }
    function handleSubmit(e) {
        e.preventDefault()
        handleNewAccount(inputs)
    }
    return (
        <Card style ={{width:"60%",margin:"20px auto"}}>
            <Card.Body style= {{padding: "20px"}}>
                <form onSubmit={handleSubmit}className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="fName" className="form-label">First Name:</label>
                        <input onChange = {handleInput}value={inputs.fName}type="text" className="form-control" id="fName"/>
                        </div>
                    <div className="col-md-6">
                        <label htmlFor="lName" className="form-label">Last Name:</label>
                        <input onChange = {handleInput}value={inputs.lName}type="text" className="form-control" id="lName"/>
                    </div> 
                    <div className="col-md-12">
                        <label htmlFor="birthday" className="form-label">Birthday:</label>
                        <input onChange = {handleInput}value={inputs.birthday}type="date" className="form-control" id="birthday"/>
                    </div> 
                    <div className="col-md-12">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input onChange = {handleInput}value={inputs.username}type="text" className="form-control" id="username"/>
                    </div>  
                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input onChange = {handleInput}value={inputs.password}type="password" className="form-control" id="password"/>
                    </div> 
                    <div className="col-md-12">
                        <label htmlFor="picture" className="form-label">Profile Picture: </label>
                        <input onChange = {handleInput}value={inputs.picture}type="file" className="form-control" id="picture"/>
                    </div> 
                    <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create Account</button>
                    </div>
                </form>
            </Card.Body>
            <Outlet />
        </Card>
    );
}

export default CreateAccount