import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ViewBlog = () => {
  const { auth, getUser, userid, backendAPI } = useContext(AppContext);
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    body: "",
  });
  const getblog = async () => {
    try {
      const res = await fetch(backendAPI + `/get/blog/viewblog/${id}`);
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setBlog(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    auth();
    getblog();
  }, []);
  useEffect(() => {
    getUser();
  }, [userid]);
  return (
    <div className="container py-4">
      <div className="mb-2">
        <h2>{blog.title}</h2>
        <small className="text-muted">{blog.createdAt}</small>
      </div>
      <p>{blog.body}</p>
    </div>
  );
};

export default ViewBlog;
