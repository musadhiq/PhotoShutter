import React from "react";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      {window.location.pathname === "/" && (
        <Link to={"/new_post"}>
          <div className="add_post_container">
            <MdOutlinePostAdd className="add_post_btn" />
          </div>
        </Link>
      )}
    </div>
  );
}

export default Home;
