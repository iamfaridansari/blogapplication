import React, { useEffect, useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const { auth, userid, fetchBlogs, blogs } = useContext(AppContext);
  useEffect(() => {
    auth();
    fetchBlogs();
  }, []);
  //
  return (
    <>
      <div className="container py-4">
        {blogs.length === 0 ? (
          <p className="text-center">No blogs to show</p>
        ) : (
          <div className="blogcard">
            {blogs.map((item, index) => {
              return (
                <BlogCard
                  key={index}
                  isUser={userid === item.user}
                  blog={item}
                  fetchBlogs={fetchBlogs}
                />
              );
            })}
          </div>
        )}
      </div>
      <NavLink to="/createblog" className="btn btn-primary createblog">
        <FaPlus />
      </NavLink>
    </>
  );
};

export default Home;
