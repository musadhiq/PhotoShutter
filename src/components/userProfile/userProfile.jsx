import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loading/Loader";
import Post from "../Posts/Post/Post";

// icons
import { AiOutlineEdit } from "react-icons/ai";
import EditProf from "./EditProf/EditProf";
import Skeleton from "react-loading-skeleton";
import { userDetailsContext } from "../../functions/Context/UserDetailsProvider";

function UserProfile({ users }) {
  //context
  const { userId, user } = useContext(userDetailsContext);

  const Navigate = useNavigate();
  //
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 2000);
  if (userId === null) Navigate("/");

  const posts = useSelector((state) => state.posts);
  const userPosts = posts.filter((post) => post.creator === userId);

  const Duser = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);

  // fetch user
  return (
    <div className="profile">
      {editMode ? (
        <EditProf setEditMode={setEditMode} user={Duser} />
      ) : (
        <div className="user-info">
          {loader && <Loader />}
          {user && (
            <div className="user">
              <div className="user-data">
                <div className="avatar">
                  {Duser.userImg ? (
                    <img src={Duser.userImg} alt={Duser.userName} />
                  ) : (
                    <Skeleton
                      circle={true}
                      height={100}
                      highlightColor="#333333"
                      baseColor="#1F1F1F"
                    />
                  )}
                </div>
                {Duser.userName ? (
                  <div className="details">
                    <h1 className="name">{Duser.userName}</h1>
                    <p className="bio">
                      {Duser.Bio ? Duser.Bio : "PhotoShutter is Awsome 💕💕"}
                    </p>
                  </div>
                ) : (
                  <Skeleton
                    count={2}
                    height={8}
                    width={200}
                    highlightColor="#333333"
                    baseColor="#1F1F1F"
                  />
                )}
              </div>
              {user._id === userId && (
                <AiOutlineEdit
                  className="edit"
                  onClick={() => setEditMode(true)}
                />
              )}
            </div>
          )}
        </div>
      )}
      {/* posts */}
      <div className="user-posts">
        <h1 className="posts"> Posts</h1>
        <div className="posts_container">
          {userPosts.length > 0 ? (
            userPosts
              .slice(0)
              .reverse()
              .map((item, index) => (
                <Post data={item} key={index} users={users} />
              ))
          ) : (
            <Loader top={true} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
