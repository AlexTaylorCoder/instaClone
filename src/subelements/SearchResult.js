import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../customHooks/userObj";
import "../styles.css";
import { Link } from "react-router-dom";

//UserObj is the current logged in User
// User is the curent focused user

function SearchResult({ user }) {
  const { userObj, setuserObj } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <Dropdown.Item href={"/profile/" + user.id} eventKey={user.id}>
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
      </div>
    </Dropdown.Item>
  );
}

export default SearchResult;
