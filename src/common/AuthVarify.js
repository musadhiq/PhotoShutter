export const AuthVarify = (jwt, dispatch, logout, Navigate, setError) => {
  if (localStorage.getItem("profile")) {
    const user = JSON.parse(localStorage.getItem("profile"))?.token;

    const dateNow = new Date().getTime() / 1000;
    const Decoded = jwt(user);

    if (Decoded.exp < dateNow) {
      setError("Session Expired please LogIn");
      dispatch(logout(Navigate));
    }
  }
};
