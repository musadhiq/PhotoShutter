import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

function Posts() {
  const data = useSelector((state) => state.posts);
  return (
    <div className="posts_container">
      {data
        ?.slice(0)
        .reverse()
        .map((item, index) => (
          <Post data={item} key={index} />
        ))}
    </div>
  );
}

export default Posts;
