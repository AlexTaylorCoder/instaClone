import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../customHooks/userObj";
import "../styles.css";
import Post from "../subelements/Post";
import NavigationBar from "./Navbar";

const patcherHeader = {
  method: "PATCH",
  headers: {
    "content-type": "application/json",
  },
};

function Home() {
  const [posts, setPosts] = useState([]);
  const { userObj, setuserObj } = useContext(UserContext);

  function addcomment(submitPost, comment) {
    const date = new Date();
    let timeofCreation = date.getTime();

    submitPost.comments.push({
      comment: comment,
      timeStamp: timeofCreation,
      profPic: userObj.picture,
      username: userObj.username,
    });
    fetch("http://localhost:3001/posts/" + submitPost.id, {
      ...patcherHeader,
      body: JSON.stringify({ ...submitPost }),
    });
  }
  function getPostsGlobalUserFollows() {
    setPosts([]);
    getPosts(userObj.following.length - 1);
  }

  useEffect(() => {
    getPostsGlobalUserFollows();
  }, []);

  function getPosts(i) {
    if (i < 0) {
      setPosts((posts) => {
        let tempPosts = [...posts];

        tempPosts.sort(function (a, b) {
          if (a.timeStamp > b.timeStamp) {
            return -1;
          }
          if (a.timeStamp < b.timeStamp) {
            return 1;
          }

          // names must be equal
          return 0;
        });

        return tempPosts;
      });
      return;
    }
    fetch("http://localhost:3001/users/" + userObj.following[i].id)
      .then((res) => res.json())
      .then((data) => {
        for (let post of data.posts) {
          const fullPostObj = {
            ...post,
            profPic: userObj.following[i].picture,
            username: userObj.following[i].username,
          };

          setPosts((posts) => [...posts, fullPostObj]);
        }

        getPosts(i - 1);
      });
  }

  const postsToInclude = posts.map((post) => {
    return <Post key={post.id} post={post} addcomment={addcomment} />;
  });

  return (
    <>
      <NavigationBar userObj={userObj} />
      <div id="home" className="d-flex">
        <div className="w-75 overflow-auto">{postsToInclude}</div>
        <div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Home;
