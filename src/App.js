import { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchUsers } from "./actions/user";
import UserDetailsProvider from "./functions/Context/UserDetailsProvider";

function App() {
  const [error, setError] = useState(null);
  // const [userid, setUserId] = useState(null);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(fetchUsers());
    AuthVarify(jwt, dispatch, logOut, Navigate, setError);
    // eslint-disable-next-line
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  return (
    <div className="app">
      <NavBar />
      <UserDetailsProvider>
        <Routes>
          <Route path="/" element={<Posts users={users} />} />
          <Route path="sign_up" element={<Auth />} />
          <Route path="sign_in" element={<Auth />} />
          <Route
            path="/new_post"
            element={
              <div className="form_container">
                <Form />
              </div>
            }
          />
          <Route path="/user/:name" element={<UserProfile users={users} />} />
          {/* <Route
          path="/profile"
          element={<UserProfile userid={user?._id} setPostData={setPostData} />}
        /> */}
        </Routes>
      </UserDetailsProvider>
      {error && <Error error={error} setError={setError} />}
      <Home />
    </div>
  );
}

export default App;
