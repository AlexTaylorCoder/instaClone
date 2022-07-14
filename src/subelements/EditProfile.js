import { useContext, useState } from "react"
import { UserContext } from "../customHooks/userObj"
import { useLocalStorage } from "../customHooks/uselocalstorage";
import { Navigate,useNavigate } from "react-router-dom";

import filterInput from "../helperFunc/filterInput";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const patcherHeader = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
  };

function EditProfile() {
    const navigate = useNavigate();

    const { userObj, setuserObj } = useContext(UserContext);

    const [inputs, setInputs] = useState({
        fName: userObj.fName,
        lName: userObj.lName,
        username: userObj.username,
        password: userObj.password,
        picture: userObj.picture,
        bioform: userObj.bioform,
    })

      
  function handleInput(e) {
    const res = filterInput(e.target.value,e.target.id)
    if (!res) {
      setInputs({ ...inputs, [e.target.id]: e.target.value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const prevUsername = userObj.username
    const prevPic = userObj.picture

    const newObj = {...userObj, 
        fName: inputs.fName,
        lName: inputs.lName,
        username: inputs.username,
        password: inputs.password,
        picture: inputs.picture,
        bioform: inputs.bioform, }
    fetch("http://localhost:3001/users/"+userObj.id,{...patcherHeader,
    body:JSON.stringify(newObj),
    }).then(resp=>resp.json()).then((resp)=>setuserObj(resp)).then(()=>navigate("/profile/" + userObj.id))

    let match = false
    if (inputs.username !== userObj.username || inputs.picture !== userObj.picture) {
        fetch("http://localhost:3001/posts").then(resp=>resp.json()).then(postData=>{
            for (let post of postData) {
              if (post.username === prevUsername) {
                fetch("http://localhost:3001/posts/"+post.id,{...patcherHeader,
                    body:JSON.stringify({...post,username:inputs.username, profPic:inputs.picture}), 
                  }).then(resp=>resp.json()).then(()=>checkComment(post))
              }
              else {
                checkComment(post)
              }
            }
        })
    }
            
      function checkComment(post) {
          match = false
          for (let comment of post.comments) {
            console.log(comment.username, prevUsername)
            if (comment.username === prevUsername) {
              match = true
              comment.profPic = inputs.picture
              comment.username = inputs.username
            }
          }        
          if (match) {
            fetch("http://localhost:3001/posts/"+post.id,{...patcherHeader,
              body:JSON.stringify({...post,comments:post.comments}), 
            }).then(resp=>resp.json(console.log(resp))).then(()=>navigate("/profile/" + userObj.id))

          }
        }
    }

    return (
    <div id ="edit-profile-page" className="create-account-card">
        <Card style={{ padding: "25px" }}>
            <img style={{margin:"0 auto"}}width="250px" height="auto"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"/>
      <Card.Body style={{ padding: "40px 70px" }}>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="fName" className="form-label">
              <p>First Name:</p>
            </label>
            <input
              required
              onChange={handleInput}
              value={inputs.fName}
              type="text" placeholder={userObj.fName}
              className="form-control"
              id="fName"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lName" className="form-label">
              <p>Last Name:</p>
            </label>
            <input
              required
              onChange={handleInput}
              value={inputs.lName}
              type="text" placeholder={userObj.lName}
              className="form-control"
              id="lName"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              required 
              onChange={handleInput}
              value={inputs.username}
              type="text" placeholder={userObj.username}
              className="form-control"
              id="username"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              required
              onChange={handleInput}
              value={inputs.password}
              type="password" placeholder={userObj.password}
              className="form-control"
              id="password"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="picture" className="form-label">
              Profile Picture:{" "}
            </label>
            <input
              onChange={handleInput}
              value={inputs.picture}
              type="text" placeholder={userObj.picture}
              className="form-control"
              id="picture"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="bioform" className="form-label">
              Description:{" "}
            </label>
            <textarea
              onChange={handleInput}
              value={inputs.bioform}
              type="text" placeholder={userObj.bioform}
              className="form-control"
              id="bioform"
            />
          </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Edit Account
            </button>
        </form>
      </Card.Body>
    </Card>
        </div>
    )
}

export default EditProfile