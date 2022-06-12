import React, { useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import { GiAbstract090 } from "react-icons/gi";

function Post({ data, setPostData, setUserId }) {
  let user = " ";
  if (localStorage.getItem("profile")) {
    user = JSON.parse(localStorage.getItem("profile")).result._id;
  }

  const id = data?._id;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(data?.likes?.length);
  const [liked, setLiked] = useState(data?.likes?.includes(user));

  const like = () => {
    setLikeCount(likeCount + 1);
    dispatch(likePost(id));
    setLiked(true);
  };
  const dislike = () => {
    setLikeCount(likeCount - 1);
    dispatch(likePost(id));
    setLiked(false);
  };
  const DeletePost = () => {
    dispatch(deletePost(id));
  };
  const EditPost = () => {
    setPostData(data);
    Navigate("/new_post");
  };

  return (
    <div className="post">
      <div className="overlay">
        <div className="user-avatar">
          <Link
            onClick={() => {
              setUserId(data.creator);
            }}
            to={
              window.location.pathname.split("/")[1] === "user"
                ? `/`
                : `/user/${data.name}`
            }
          >
            <div className="avatar">
              {data.creator ? (
                <img
                  src={
                    user.userImg
                      ? user.userImg
                      : "https://i.picsum.photos/id/1069/536/354.jpg?hmac=ywdE7hQ_NM4wnxJshRkXBsy-MHlGRylyqlb51WToAQA"
                  }
                  alt="avatar"
                />
              ) : (
                <GiAbstract090 />
              )}
            </div>
            <span className="name">{data?.name}</span>
          </Link>
        </div>

        {user === data?.creator && (
          <i className="post_actions">
            <BsTrash className="action" onClick={DeletePost} />
            <AiFillEdit className="action" onClick={EditPost} />
          </i>
        )}
      </div>
      <div className="post_top">
        <img src={data?.selectedFile} alt="post_image" />
      </div>
      <div className="post_content">
        <h1 className="post_header">{data?.title}</h1>
        <p className="details">{data?.message}</p>
      </div>
      <div className="post_footer">
        <div className="likes-bar">
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
        <div className="tags">
          {data?.tags?.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
