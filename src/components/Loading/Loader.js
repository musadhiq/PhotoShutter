import React from "react";

export const Loader = ({ content }) => {
  return (
    <>
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
        <span className="inner content" data-text={content && content}>
          {content && content}
        </span>
      </div>
    </>
  );
};
