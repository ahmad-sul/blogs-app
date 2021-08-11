import React, { useEffect, useState } from "react";
import baseURL from "../config/baseURL";
import axios from "axios";

import { Link } from "react-router-dom";

export default function MyBlogs() {
  const [user, setUser] = useState();
  const [blog, setBlog] = useState();

  const getUser = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const userData = await axios.get(baseURL + "users/" + userId);
      // console.log(userData);
      setUser(userData.data);
    }
  };
  const getUserBlog = async () => {
    const userId = localStorage.getItem("userId");
    const userBlogs = await axios.get(baseURL + "blogs/getUserBlog/" + userId);
    setBlog(userBlogs.data);
  };
  const deleteBlog = async (el) => {
    console.log("delete user blog");
    const userId = localStorage.getItem("userId");
    const userBlogs = await axios.delete(
      baseURL + "blogs/deleteBlog/" + userId
    );
    const restBlogs = await axios.get(baseURL + "blogs/getUserBlog/" + userId);
    console.log(restBlogs);
    setBlog(restBlogs.data);
    window.location.reload();
  };

  useEffect(() => {
    getUser();
    getUserBlog();
  }, []);

  return user ? (
    <div className="container height">
      <h1>My Blogs</h1>
      <h4>Hallo {user.userName}</h4>
      <h4>{user.email}</h4>

      <Link to="/createblog" className="btn btn-outline-warning mt-2 w-100">
        NEW BLOG
      </Link>
      {blog && blog.length > 0 ? (
        blog.map((el) => {
          return (
            <div key={el.id}>
              <li className="d-flex m-3 justify-content-between border">
                <div className="d-flex align-items-center">
                  <img
                    src={require(`./images/${el.img}`).default}
                    className=""
                    width="100"
                    alt="2"
                  />
                  <p className="bg-white ms-2">{el.title}</p>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to={"/editBlog/" + el._id}
                    className="btn btn-outline-success me-2"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger me-2"
                    onClick={(el) => deleteBlog(el)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          );
        })
      ) : (
        <div>No Blogs</div>
      )}
    </div>
  ) : (
    <div>loading</div>
  );
}
