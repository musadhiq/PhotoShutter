import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

function Posts({ setPostData }) {
  const data = useSelector((state) => state.posts);
  return (
    <div className="posts_container">
      {data
        ?.slice(0)
        .reverse()
        .map((item, index) => (
          <Post data={item} key={index} setPostData={setPostData} />
        ))}
    </div>
  );
}

export default Posts;
