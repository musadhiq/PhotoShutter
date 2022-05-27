import React from "react";

function PostLoading() {
  return (
    <div className="loading">
      <div className="post">
        <div className="overlay">hi</div>
        <div className="post_top">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
        <div className="post_content">
          <h1 className="post_header">iiii</h1>
          <p className="details"></p>
        </div>
        <div className="post_footer">
          <div className="tags"></div>
        </div>
      </div>
    </div>
  );
}

export default PostLoading;
