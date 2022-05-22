import React, { useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import image from "../../../assets/image/test.jpg";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../actions/posts";

function Post({ data }) {
  let user = " ";
  if (localStorage.getItem("profile")) {
    user = JSON.parse(localStorage.getItem("profile")).result._id;
  }

  const id = data?._id;
  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(data?.likes?.length);
  const [liked, setLiked] = useState(data?.likes?.includes(user));

  const like = () => {
    setLikeCount(likeCount + 1);
    dispatch(likePost(id));
  };
  const dislike = () => {
    setLikeCount(likeCount - 1);
    dispatch(likePost(id));
  };
  const DeletePost = () => {
    dispatch(deletePost(id));
  };
  return (
    <div className="post">
      <div className="overlay">
        <span className="name">{data?.name}</span>

        {user === data?.creator && (
          <i className="post_actions">
            <BsTrash className="action" onClick={DeletePost} />
            <AiFillEdit className="action" />
          </i>
        )}
      </div>
      <div className="post_top">
        <img src={data?.selectedFile || image} alt="post_image" />
      </div>
      <div className="post_content">
        <h1 className="post_header">{data?.title}</h1>
        <p className="details">{data?.message}</p>
      </div>
      <div className="post_footer">
        {liked ? (
          <span className="likes">
            <FcLike onClick={dislike} />
          </span>
        ) : (
          <span className="likes">
            <FcLikePlaceholder onClick={like} className="like" />
          </span>
        )}
        <span className="count">{likeCount}</span>
      </div>
    </div>
  );
}

export default Post;
