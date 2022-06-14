import React, { useContext, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../actions/user";
import { userDetailsContext } from "../../../functions/Context/UserDetailsProvider";
import addBtn from "../../../res/images/addBtn.png";
function EditProf({ setEditMode, user }) {
  // context

  const { userId } = useContext(userDetailsContext);

  const [userData, setUserData] = useState({
    userName: user.userName,
    Bio: user.Bio,
    userImg: user.userImg,
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    dispatch(updateUser(userId, userData));
  };

  return (
    <div className="edit-profile">
      <form>
        <div className="avatar">
          <img
            className="avatar-image"
            src={userData.userImg ? userData.userImg : addBtn}
            alt="userImg"
            onClick={() => {
              document.querySelector("input[type=file]").click();
            }}
          />
          <FileBase
            className="inputfile"
            type="file"
            accept="image/*"
            multiple={false}
            value={userData.userImg}
            onDone={({ base64 }) =>
              setUserData({ ...userData, userImg: base64 })
            }
          />
        </div>

        <div className="form-row">
          <input
            className="input-text"
            type="text"
            name="username"
            placeholder="userName "
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
          />
          <label className="label-helper" htmlFor="title">
            UserName :
          </label>
        </div>
        <div className="form-row">
          <input
            className="input-text"
            type="text"
            name="bio"
            placeholder="Say Something about you ⭐"
            value={userData.Bio}
            onChange={(e) => setUserData({ ...userData, Bio: e.target.value })}
          />
          <label className="label-helper" htmlFor="title">
            Bio :
          </label>
        </div>
        {/* <input
          type="password"
          name="Password"
          className="password"
          placeholder="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        /> */}
        {/* <input
          type="email"
          name="email"
          className="email"
          placeholder="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        /> */}
        <input
          type="submit"
          className="btn submit"
          value="Save"
          onClick={handleSubmit}
        />
        <input
          type="submit"
          value="Discard"
          className="btn cancel"
          onClick={(e) => {
            e.preventDefault();
            setEditMode(false);
          }}
        />
      </form>
    </div>
  );
}

export default EditProf;
