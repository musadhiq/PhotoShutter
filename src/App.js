import { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import NavBar from "./components/NavBar/Navbar";
import Posts from "./components/Posts/Posts";
import Auth from "./components/auth/Auth";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const [post, setPost] = useState(true);
  const location = useLocation();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handlesubmit = () => {
    setPost(!post);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, location]);
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
              <Form
                submit={handlesubmit}
                postData={postData}
                setPostData={setPostData}
              />
            </div>
          }
        />
      </Routes>

      <Home handlesubmit={handlesubmit} post={post} />
    </div>
  );
}

export default App;
