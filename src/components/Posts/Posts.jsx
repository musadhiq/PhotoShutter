import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Loader } from "../Loading/Loader";

function Posts({ users }) {
  const data = useSelector((state) => state.posts);

  return (
    <div className="posts_container">
      {data.length > 0 ? (
        data
          .slice(0)
          .reverse()
          .map((item, index) => <Post data={item} key={index} users={users} />)
      ) : (
        <Loader content={"Loading..."} />
      )}
    </div>
  );
}

export default Posts;
