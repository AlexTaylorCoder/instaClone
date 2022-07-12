import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../customHooks/userObj";
import "../styles.css";
import Post from "../subelements/Post";

function Home() {
  const [posts, setPosts] = useState([]);
  const { userObj, setuserObj } = useContext(UserContext);

  function getPostsGlobalUserFollows() {
    setPosts([]);
    getPosts(userObj.following.length - 1);
  }

  useEffect(() => {
    getPostsGlobalUserFollows();
  }, []);

  function getPosts(i) {
    if (i < 1) {
      return;
    }
    fetch("http://localhost:3001/users/" + userObj.following[i].id)
      .then((res) => res.json())
      .then((data) => {
        setPosts((posts) => [...posts, ...data.posts]);

        getPosts(i - 1);
      });
  }

  const postsToInclude = posts.map((post) => {
    return <Post post={post} />;
  });

  return (
    <div id="home" className="d-flex">
      <div className="w-75 overflow-auto">{postsToInclude}</div>
      <div>
        <div></div>
      </div>
    </div>
  );
}

export default Home;
