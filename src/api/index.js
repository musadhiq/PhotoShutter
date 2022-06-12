import axios from "axios";

const API = axios.create({ baseURL: "https://mem-post.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// post

export const fetchPosts = () => API.get("/posts");

export const createPost = (newpost) => API.post("/posts/add_post", newpost);

export const updatePost = (updatePost, id) =>
  API.patch(`/posts/${id}/update_post`, updatePost);

export const likePost = (id) => API.patch(`/posts/${id}/like`);

export const deletePost = (id) => API.delete(`/posts/${id}/delete_post`);

// auth

export const getUser = (id) => API.get(`/user/${id}`);

export const signUp = (user) => API.post("/user/new", user);

export const signIn = (user) => API.post("/user/login", user);

export const updateUser = (id, user) => API.patch(`/user/edit/${id}`, user);
