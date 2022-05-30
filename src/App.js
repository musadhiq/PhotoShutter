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

function App() {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [error, setError] = useState(null);
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
        <Route path="/" element={<Posts setPostData={setPostData} />} />
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
      </Routes>
      {error && <Error error={error} setError={setError} />}
      <Home />
    </div>
  );
}

export default App;
