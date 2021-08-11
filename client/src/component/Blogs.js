import React, { useEffect, useState } from "react";

import baseURL from "../config/baseURL";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { IoIosEye } from "react-icons/io";

export default function Blogs() {
  const [blogsData, setData] = useState();
  const counter = 0;
  useEffect(() => {
    // console.log('fetch data to blogs');
    fetch(baseURL + "blogs")
      .then((res) => {
        // console.log(res);

        return res.json();
      })
      .then((result) => {
        setData(result.data);
      });
  }, []);

  return (
    <div className=" container p-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {blogsData &&
          blogsData.map((blog) => {
            // console.log(blog);
            return (
              <div className="col bloghover h-100">
                <Link
                  to={"/singleblog/" + blog._id}
                  className="card overflow-hidden blogCard text-dark text-decoration-none "
                >
                  {blog.views < 1 ? (
                    <span className="views text-center rounded">New</span>
                  ) : (
                    <span className="views nrViews text-center rounded">
                      <small className="p-3">
                        <IoIosEye /> {blog.views}
                      </small>
                    </span>
                  )}

                  <img
                    src={require(`./images/${blog.img}`).default}
                    className="card-img-top cardImg"
                    alt="2"
                  />
                </Link>
                <div className="card-body">
                  
                  <p className="card-title fw-bold ">{blog.title}</p>
                  <p className="card-text bg-white">
                    By: {blog.userId.userName}.{" "}
                    <img
                      className="rounded-circle"
                      src={blog.userId.avatar}
                      alt="222"
                      width="30"
                    />{" "}
                  </p>
                  <span>
                    {" "}
                    <Moment format="YYYY/MM/DD">{blog.date}</Moment>
                  </span>{" "}
                  <p className="card-text bg-white">
                    {" "}
                    Category: {blog.Category}
                  </p>
                  {/* <Link to={'/singleblog/'+ blog._id} className=" overflow-hidden blogCard text-dark text-decoration-none" >
     <p className="card-text bg-white">{blog.content.split(' ').slice(0, 20).join(' ')}</p>
     </Link> */}
                </div>

                <div className="card-footer">
                  <small className="text-muted">
                    Last updated: <Moment toNow>{blog.date}</Moment>
                    <span></span>
                  </small>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
