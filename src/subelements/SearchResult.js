import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles.css";

function SearchResult({ user }) {
  function handleFollow() {
    const currentUserObj = {};

    const followedUserObj = {};
  }
  return (
    <Dropdown.Item eventKey="3">
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
        <Button>Follow</Button>
      </div>
    </Dropdown.Item>
  );
}

export default SearchResult;
