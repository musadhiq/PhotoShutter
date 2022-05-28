import React from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from "react-router-dom";

function Home({ handlesubmit, post }) {
  return (
    <div className="home">
      {post && (
        <Link to={"/new_post"}>
          <div className="add_post_container">
            <MdOutlinePostAdd className="add_post_btn" onClick={handlesubmit} />
          </div>
        </Link>
      )}
    </div>
  );
}

export default Home;
