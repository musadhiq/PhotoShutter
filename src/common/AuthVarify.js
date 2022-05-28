export const AuthVarify = (jwt, dispatch, logout, Navigate) => {
  if (localStorage.getItem("profile")) {
    const user = JSON.parse(localStorage.getItem("profile"))?.token;
    console.log(user);
    const dateNow = new Date();
    const Decoded = jwt(user);
    if (Decoded.exp < dateNow.getTime()) {
      dispatch(logout(Navigate));
    }
  }
};
