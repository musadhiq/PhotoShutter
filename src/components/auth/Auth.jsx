import React, { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";
import { Loader } from "../Loading/Loader";
import Error from "../Error/Error";

function Auth() {
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  //loading

  const userErr = useSelector((state) => state.auth);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  // signup //sign in

  //   password eye
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //   user data submit

  const handleReset = () => {
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // sign up

  const isNull = userData.email === "" || userData.password === "";

  const handleSignUp = (e) => {
    e.preventDefault();
    if (isNull) return setError("Fill the Credentionals");
    if (userData.password !== userData.confirmPassword) {
      setError("password dosn't match");
    } else {
      dispatch(signUp(userData, Navigate));
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 10000);
      if (userErr?.message) {
        setError(userErr.message);
        setLoader(false);
      }
    }
  };

  // sign in

  const handleSignIn = (e) => {
    e.preventDefault();
    if (isNull) return setError("Fill the Credentionals");
    dispatch(signIn(userData, Navigate));
    setLoader(true);
    if (userErr?.message) {
      setError(userErr.message);
      setLoader(false);
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <form className="auth_sign">
          {window.location.pathname === "/sign_up" ? (
            <div>
              <h1>Create Account </h1>

              <div className="form-row">
                <input
                  className="input-text"
                  type="text"
                  name="firstName"
                  placeholder="FirstName"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
                <label className="label-helper" htmlFor="firstName">
                  FirstName
                </label>
              </div>
              <div className="form-row">
                <input
                  className="input-text"
                  type="text"
                  name="lastName"
                  placeholder="LastName"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
                <label className="label-helper" htmlFor="lastName">
                  LastName
                </label>
              </div>
              <div className="form-row">
                <input
                  className="input-text"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <label className="label-helper" htmlFor="email">
                  Enter Email
                </label>
              </div>

              <div className="password_block">
                <div className="pass-field">
                  <div className="form-row">
                    <input
                      className="input-text"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="password"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                    />
                    <label className="label-helper" htmlFor="password">
                      {" "}
                      Password :{" "}
                    </label>
                  </div>
                  <div className="form-row">
                    <input
                      className="input-text"
                      placeholder="Confirm Password"
                      type={showPassword ? "text" : "password"}
                      name="ConfirmPassword"
                      value={userData.confirmPassword}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <label className="label-helper" htmlFor="ConfirmPassword">
                      Confirm Password :{" "}
                    </label>
                  </div>
                </div>
                <i className="password_eye" onClick={handleShowPassword}>
                  <VscEyeClosed />
                </i>
              </div>
            </div>
          ) : (
            // </form>
            // <form className="auth_sign">
            <div>
              <h1>Login Account </h1>
              <div className="form-row">
                <input
                  className="input-text"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
                <label className="label-helper" htmlFor="email">
                  Enter Email
                </label>
              </div>

              <div className="password_block">
                <div className="form-row pass-field">
                  <input
                    className="input-text"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />
                  <label className="label-helper" htmlFor="password">
                    Password :
                  </label>
                </div>
                <i className="password_eye" onClick={handleShowPassword}>
                  <VscEyeClosed />
                </i>
              </div>
            </div>
          )}
          <div className="buttons">
            <div className="sign_btn">
              {window.location.pathname === "/sign_up" ? (
                <button
                  type="submit"
                  className="btn sign"
                  onClick={handleSignUp}
                >
                  Submit
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn sign"
                  onClick={handleSignIn}
                >
                  Login
                </button>
              )}
              <button type="reset" className="btn reset" onClick={handleReset}>
                Reset
              </button>
              <br />
              <i>Already have an Account? </i>
              {window.location.pathname === "/sign_up" ? (
                <Link className="sign_in" to={"/sign_in"}>
                  Sign In
                </Link>
              ) : (
                <Link className="sign_in" to={"/sign_up"}>
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </form>
        {loader && <Loader />}
        {error && <Error error={error} setError={setError} />}
      </div>
    </div>
  );
}

export default Auth;
