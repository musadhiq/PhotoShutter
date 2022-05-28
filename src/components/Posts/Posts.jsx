import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Loader } from "../Loading/Loader";

function Posts({ setPostData }) {
  const data = useSelector((state) => state.posts);

  return (
    <div className="posts_container">
      {data.length > 0 ? (
        data
          .slice(0)
          .reverse()
          .map((item, index) => (
            <Post data={item} key={index} setPostData={setPostData} />
          ))
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Posts;
