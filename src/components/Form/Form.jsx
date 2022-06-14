import React, { useContext, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../Loading/Loader";
import Error from "../Error/Error";
import { userDetailsContext } from "../../functions/Context/UserDetailsProvider";
import addBtn from "../../res/images/addBtn.png";

function Form() {
  // context

  const { postData, setPostData } = useContext(userDetailsContext);
  console.log(postData);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClear = (e) => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isNull = postData.title === "" || postData.selectedFile === "";

    if (!isNull && postData._id && user) {
      // update post
      dispatch(
        updatePost(
          { ...postData, name: user?.result?.userName },
          postData._id,
          Navigate
        )
      );
      setLoader(true);
      handleClear();
    } else if (!isNull && user) {
      // create post
      dispatch(
        createPost({ ...postData, name: user?.result?.userName }, Navigate)
      );
      setLoader(true);
      handleClear();
    } else if (!user) {
      setError("UnAuthenticated");
    } else {
      setError("Fill the values");
    }
  };

  // error handling
  return (
    <>
      <div className="form">
        <div className="close_container">
          <Link to={"/"}>
            <HomeIcon className="close_btn" onClick={() => Navigate("/")} />
          </Link>
        </div>
        <h1 className="heading">Create new Post</h1>
        <form className="form_field">
          <div className="file_img">
            <img
              className="selected_file"
              src={postData.selectedFile ? postData.selectedFile : addBtn}
              alt="post"
              onClick={() => {
                document.querySelector("input[type=file]").click();
              }}
            />
          </div>
          <div className="file_upload">
            <FileBase
              type="file"
              accept="image/*"
              multiple={false}
              value={postData.selectedFile}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>

          <div className="form-row">
            <input
              className="input-text"
              type="text"
              name="title"
              placeholder="Enter Title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <label className="label-helper" htmlFor="title">
              Enter Title :
            </label>
          </div>
          <div className="form-row">
            <input
              className="input-text"
              type="text"
              name="Message"
              placeholder="Message"
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            <label className="label-helper" htmlFor="Message">
              Message :
            </label>
          </div>
          <div className="form-row">
            <input
              className="input-text"
              type="text"
              name="tags"
              placeholder="Tags"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(",", 5) })
              }
            />
            <label className="label-helper" htmlFor="tags">
              Tags :
            </label>
          </div>
          <div className="buttons">
            <button
              className="btn btn_submit"
              type="submit"
              onClick={handleSubmit}
            >
              {postData._id ? "Update Post" : "Submit"}
            </button>
            <button
              className="btn btn_clear"
              type="clear"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      {/* error */}
      {error && <Error error={error} setError={setError} />}
      {/* loader */}
      {loader && (
        <div className="loader-container">
          <Loader content={"posting..."} />
        </div>
      )}
    </>
  );
}

export default Form;
