import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { useLocation } from "react-router-dom";

import {
  RiMenuUnfoldLine,
  // RiSearchLine,
  RiUserSmileLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

function NavBar() {
  const [user, setUser] = useState();
  const Location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      const data = JSON.parse(localStorage.getItem("profile"));
      setUser(jwt(data.token));
    }
  }, [Location]);

  return (
    <nav>
      <div className="nav_header">
        <span className="menu_icon">
          <RiMenuUnfoldLine />
        </span>
        <Link to={"/"}>
          <h1 className="logo">memmories</h1>
        </Link>
      </div>
      {/* <div className="nav_search">
        <form>
          <RiSearchLine />
          <input
            type="search"
            name="search"
            placeholder="Search For memories..."
          />
        </form>
      </div> */}
      <div className="user">
        <span>{user?.userName}</span>
        <div className="nav_userImg">
          {user?._id ? (
            <Link to={"/profile"}>
              <RiUserSmileLine />
            </Link>
          ) : (
            <Link to={"/sign_up"}>
              <RiUserSmileLine />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
