import { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import NavBar from "./components/NavBar/Navbar";
import Posts from "./components/Posts/Posts";
import Auth from "./components/auth/Auth";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import { Route, Routes } from "react-router-dom";
import { AuthVarify } from "./common/AuthVarify";
import jwt from "jwt-decode";
import { logOut } from "./actions/auth";
import { useNavigate } from "react-router-dom";
import Error from "./components/Error/Error";
import UserProfile from "./components/userProfile/userProfile";

function App() {
  // user
  let user;
  if (localStorage.getItem("profile")) {
    user = JSON.parse(localStorage.getItem("profile")).result;
  }

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [error, setError] = useState(null);
  const [userid, setUserId] = useState(null);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
    AuthVarify(jwt, dispatch, logOut, Navigate, setError);
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Posts setPostData={setPostData} setUserId={setUserId} />}
        />
        <Route path="sign_up" element={<Auth />} />
        <Route path="sign_in" element={<Auth />} />
        <Route
          path="/new_post"
          element={
            <div className="form_container">
              <Form postData={postData} setPostData={setPostData} />
            </div>
          }
        />
        <Route
          path="/user/:name"
          element={<UserProfile userid={userid} setPostData={setPostData} />}
        />
        <Route
          path="/profile"
          element={<UserProfile userid={user?._id} setPostData={setPostData} />}
        />
      </Routes>
      {error && <Error error={error} setError={setError} />}
      <Home />
    </div>
  );
}

export default App;
