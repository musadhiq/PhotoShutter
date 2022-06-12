import React from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../actions/user";

function EditProf({ setEditMode, userData, setUserData, user }) {
  const dispatch = useDispatch();
  console.log(userData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    dispatch(updateUser(user, userData));
  };

  return (
    <div className="edit-profile">
      <form>
        <div className="avatar">
          <img
            className="avatar-image"
            src={userData.userImg}
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

        <input
          type="text"
          name="userName"
          className="userName"
          placeholder="userName"
          value={userData.userName}
          onChange={(e) =>
            setUserData({ ...userData, userName: e.target.value })
          }
        />
        <input
          type="text"
          name="Bio"
          className="bio"
          placeholder="Say Something about you ⭐"
          value={userData.Bio}
          onChange={(e) => setUserData({ ...userData, Bio: e.target.value })}
        />
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
