import React, { useEffect, useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";
import { Loader } from "../Loading/Loader";
import { Error } from "../Error/Error";

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

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 5000);
  }, [error]);

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
        {window.location.pathname === "/sign_up" ? (
          <form className="auth_sign">
            <h1>Create Account </h1>
            <div>
              <label htmlFor="firstName">FirstName : </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="lastName">LastName : </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Enter Email : </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            <div className="password_block">
              <div>
                <div>
                  <label htmlFor="password"> Password : </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="ConfirmPassword">Confirm Password : </label>
                  <input
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
                </div>
              </div>
              <i className="password_eye" onClick={handleShowPassword}>
                <VscEyeClosed />
              </i>
            </div>

            <div className="buttons">
              <div className="sign_btn">
                <button
                  type="submit"
                  className="btn sign"
                  onClick={handleSignUp}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <br />
                <i>Already have an Account? </i>
                <Link className="sign_in" to={"/sign_in"}>
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        ) : (
          <form className="auth_sign">
            <h1>Login Account </h1>
            <div>
              <label htmlFor="email">Enter Email : </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>

            <div className="password_block">
              <div>
                <label htmlFor="password"> Password : </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>
              <i className="password_eye" onClick={handleShowPassword}>
                <VscEyeClosed />
              </i>
            </div>

            <div className="buttons">
              <div className="sign_btn">
                <button
                  type="submit"
                  className="btn sign"
                  onClick={handleSignIn}
                >
                  Login
                </button>
                <button
                  type="reset"
                  className="btn reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <br />
                <i>Don't have an Account? </i>
                <Link className="sign_up" to={"/sign_up"}>
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        )}
        {loader && <Loader />}
        {error && <Error error={error} />}
      </div>
    </div>
  );
}

export default Auth;
