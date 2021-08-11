import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "../config/baseURL";
import Moment from "react-moment";

export default function Singleblog() {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  //    console.log(id);
  const getBlog = async () => {
    const blogData = await axios.get(baseURL + "blogs/singleBlog/" + id);
    console.log(blogData.data);
    setBlog(blogData.data);
  };
  useEffect(() => {
    getBlog();
  }, []);

  console.log(blog);
  return blog ? (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="mt-3">{blog.title}</h1>
      <Moment date={blog.date} fromNow />
      <img
        src={require(`./images/${blog.img}`).default}
        className="mt-5"
        width="800"
        alt="2"
      />
      <p
        className="bg-light mt-5 "
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></p>
      <div>
        <span></span>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
}
