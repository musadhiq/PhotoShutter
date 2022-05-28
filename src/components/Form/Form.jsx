import React from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

function Form({ submit, postData, setPostData }) {
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
    if (!isNull && postData._id) {
      dispatch(
        updatePost({ ...postData, name: user?.result?.userName }, postData._id)
      );
      Navigate("/");
      handleClear();
    } else if (!isNull) {
      dispatch(createPost({ ...postData, name: user?.result?.userName }));
      handleClear();
    } else {
      return "Fill the Values";
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
        {postData.selectedFile && (
          <div className="file_img">
            <img
              className="selected_file"
              src={postData.selectedFile}
              alt="post"
            />
          </div>
        )}
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
          placeholder="Enter tags comma separated(max: 5)"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",", 5) })
          }
        />
        <div className="buttons">
          <button
            className="btn btn_submit"
            type="submit"
            onClick={handleSubmit}
          >
            {postData._id ? "Update Post" : "Submit"}
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
