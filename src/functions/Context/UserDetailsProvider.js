import { createContext, useState } from "react";

//create a context, with createContext api
export const userDetailsContext = createContext();

const UserDetailsProvider = (props) => {
  // this state will be shared with all components

  // user
  let user;
  if (localStorage.getItem("profile")) {
    user = JSON.parse(localStorage.getItem("profile")).result;
  }

  const [userId, setUserId] = useState(null);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  return (
    // this is the provider providing state
    <userDetailsContext.Provider
      value={{
        userId,
        setUserId,
        postData,
        setPostData,
        user,
      }}
    >
      {props.children}
    </userDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
