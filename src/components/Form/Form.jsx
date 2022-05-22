import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import { VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

function Form({ submit }) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
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
    if (!isNull) {
      dispatch(createPost({ ...postData, name: user?.result?.userName }));
      Navigate("/");
    } else {
      console.log("fill the values");
    }
  };

  return (
    <div className="form">
      <div className="close_container">
        <Link to={"/"}>
          <VscEyeClosed className="close_btn" onClick={submit} />
        </Link>
      </div>
      <h1 className="heading">Create new Post</h1>
      <form className="form_field">
        {postData.selectedFile ? (
          <div className="file_img">
            <img
              className="selected_file"
              src={postData.selectedFile}
              alt="hehe"
            />
          </div>
        ) : (
          <div className="file_upload">
            <FileBase
              type="file"
              multiple={false}
              value={postData.selectedFile}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
        )}
        <input
          required
          type="text"
          name="title"
          placeholder="Enter title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <textarea
          type="text"
          name="message"
          placeholder="Enter message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <input
          type="text"
          name="tags"
          placeholder="Enter tags"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />

        <div className="buttons">
          <button
            className="btn btn_submit"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button className="btn btn_clear" type="clear" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
