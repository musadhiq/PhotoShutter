import React, { useContext, useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../../../actions/posts";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { userDetailsContext } from "../../../functions/Context/UserDetailsProvider";
import { fetchUser } from "../../../actions/user";

function Post({ data, users }) {
  // context

  const { setUserId, setPostData, user } = useContext(userDetailsContext);
  const poster = users?.filter((user) => data?.creator === user._id)[0];

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
              dispatch(fetchUser(data.creator));
            }}
            to={`/user/${data.name}`}
          >
            <div className="avatar">
              {poster ? (
                <img src={poster.userImg} alt="avatar" />
              ) : (
                <Skeleton
                  circle={true}
                  height={26}
                  highlightColor="#c0b9b97a"
                  baseColor="#73736F"
                />
              )}
            </div>
            <span className="name">
              {poster ? (
                poster.userName
              ) : (
                <Skeleton
                  width={160}
                  height={15}
                  highlightColor="#c0b9b97a"
                  baseColor="#73736F"
                />
              )}
            </span>
          </Link>
        </div>

        {user?._id === data?.creator && (
          <i className="post_actions">
            <BsTrash className="action" onClick={DeletePost} />
            <AiFillEdit className="action" onClick={EditPost} />
          </i>
        )}
      </div>
      <div className="post_top">
        {data.selectedFile ? (
          <img src={data?.selectedFile} alt="post_image" />
        ) : (
          <Skeleton height={200} />
        )}
      </div>
      <div className="post_content">
        <h1 className="post_header">
          {data.title ? data?.title : <Skeleton height={15} />}
        </h1>
        <p className="details">
          {data.message ? data?.message : <Skeleton height={10} />}
        </p>
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
          <span className="count">
            {likeCount ? likeCount : <Skeleton height={5} />}
          </span>
        </div>
        <div className="tags">
          {data.tags ? (
            data?.tags?.map((tag, index) => <span key={index}>#{tag} </span>)
          ) : (
            <Skeleton height={5} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
