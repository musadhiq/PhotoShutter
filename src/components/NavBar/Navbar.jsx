import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  RiMenuUnfoldLine,
  // RiSearchLine,
  RiUserSmileLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { logOut } from "../../actions/auth";

function NavBar() {
  // states
  const [user, setUser] = useState(null);
  const [toggler, setToggler] = useState(false);
  // hooks
  const dispatch = useDispatch();
  const Location = useLocation();
  const navigate = useNavigate();

  // functions
  const handleLogOut = () => {
    dispatch(logOut(navigate));
  };
  const handleToggler = () => {
    setToggler(!toggler);
  };
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      const data = JSON.parse(localStorage.getItem("profile")).result;
      setUser(data);
    } else {
      setUser(null);
    }
  }, [Location, user]);

  return (
    <nav>
      <div className="nav_header">
        <span className="menu_icon">
          <RiMenuUnfoldLine />
        </span>
        <Link to={"/"}>
          <h1 className="logo">PhotoShutter</h1>
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
        {user?._id ? (
          <div className="details">
            <span>{user?.userName} </span>
            <span className="drop-down-icon" onClick={handleToggler}>
              <RiArrowDropDownLine />
            </span>
            {toggler && (
              <div className="drop-down">
                <Link
                  to={"/profile"}
                  className="nav_userImg"
                  onClick={handleToggler}
                >
                  <RiUserSmileLine /> Profile
                </Link>
                <button className="log-out" onClick={handleLogOut}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav_userImg">
            <Link to={"/sign_in"}>
              <RiUserSmileLine />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
