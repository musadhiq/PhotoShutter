import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../actions/user";
import { Loader } from "../Loading/Loader";
import Post from "../Posts/Post/Post";
// icons
import { AiOutlineEdit } from "react-icons/ai";
import EditProf from "./EditProf/EditProf";

function UserProfile({ userid, setPostData }) {
  const Navigate = useNavigate();
  //
  if (userid === null) Navigate("/");

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const userPosts = posts.filter((post) => post.creator === userid);

  let loggedAs;
  if (localStorage.getItem("profile"))
    loggedAs = JSON.parse(localStorage.getItem("profile")).result._id;

  // editmode
  useEffect(() => {
    dispatch(fetchUser(userid));
  }, [userid, dispatch]);
  const user = useSelector((state) => state.user);
  const userg = useSelector((state) => state);
  const [editMode, setEditMode] = useState(false);

  const [userData, setUserData] = useState({
    userName: user.userName,
    Bio: user.Bio,
    userImg: user.userImg,
  });

  console.log(userid);
  // fetch user

  console.log(userg);

  return (
    <div className="profile">
      {editMode ? (
        <EditProf
          setEditMode={setEditMode}
          userData={userData}
          setUserData={setUserData}
          user={userid}
        />
      ) : (
        <div className="user-info">
          {user && (
            <div className="user">
              <div className="user-data">
                <div className="avatar">
                  <img
                    src={
                      user.userImg
                        ? user.userImg
                        : "https://i.picsum.photos/id/1069/536/354.jpg?hmac=ywdE7hQ_NM4wnxJshRkXBsy-MHlGRylyqlb51WToAQA"
                    }
                    alt={user.userName}
                  />
                </div>
                <div className="details">
                  <h1 className="name">{user.userName}</h1>
                  <p className="bio">
                    {user.Bio ? user.Bio : "PhotoShutter is Awsome 💕💕"}
                  </p>
                </div>
              </div>
              {loggedAs === userid && (
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
                <Post data={item} key={index} setPostData={setPostData} />
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
