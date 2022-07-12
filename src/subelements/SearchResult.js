import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../customHooks/userObj";
import "../styles.css";

//UserObj is the current logged in User
// User is the curent focused user

function SearchResult({ user }) {
  const { userObj, setuserObj } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (
      userObj.following.filter((e) => {
        return e.id === user.id;
      }).length > 0
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, []);

  function handleFollow() {
    const currentUserArray = [
      ...userObj.following,
      {
        username: user.username,
        id: user.id,
        picture: user.picture,
      },
    ];

    console.log([...user.followers]);
    console.log([...userObj.following]);

    const followedUserArray = [
      ...user.followers,
      {
        username: userObj.username,
        id: userObj.id,
        picture: userObj.picture,
      },
    ];

    const currentUserObj = { following: currentUserArray };
    const followedUserObj = { followers: followedUserArray };

    //update the current users followers
    fetch("http://localhost:3001/users/" + userObj.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(currentUserObj),
    })
      .then((res) => res.json())
      .then((data) => {
        setuserObj(data);
        setIsFollowing(true);
      });
    //update the followed users followers
    fetch("http://localhost:3001/users/" + user.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(followedUserObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("followed");
      });
  }

  function handleUnfollow() {}
  return (
    <Dropdown.Item eventKey={user.id} onClick={() => console.log("test")}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div
            className="profile-picture"
            style={{
              width: "75px",
              height: "75px",
              backgroundImage: "url(" + user.picture + ")",
            }}
          ></div>
          <div className="align-items-center m-2">
            <h5>
              <b>{user.username}</b>
            </h5>
            <h6>{user.fName + " " + user.lName}</h6>
          </div>
        </div>
        {!isFollowing ? (
          <Button
            onClick={!isFollowing ? handleFollow : handleUnfollow}
            className={"btn btn-primary"}
          >
            follow
          </Button>
        ) : (
          <div />
        )}
      </div>
    </Dropdown.Item>
  );
}

export default SearchResult;
