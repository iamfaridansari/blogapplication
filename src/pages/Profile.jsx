import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import { ImSwitch } from "react-icons/im";
import BlogCard from "../components/BlogCard";
import { FaPlus } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { setLogged, backendAPI } = useContext(AppContext);
  const { user, auth, getUser, userid } = useContext(AppContext);
  useEffect(() => {
    auth();
  }, []);
  useEffect(() => {
    getUser();
    userBlogs();
  }, [userid]);
  //
  const logout = () => {
    localStorage.removeItem("blogtoken");
    setLogged(false);
    navigate("/login", { replace: true });
  };

  // fetch user blogs
  const [blogs, setBlogs] = useState([]);
  const userBlogs = async () => {
    if (userid !== "") {
      try {
        const res = await fetch(backendAPI + `/get/blog/userblog/${userid}`);
        const data = await res.json();
        console.log(data);
        //
        if (res.status === 200) {
          setBlogs(data.blogs);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between gap-2">
          <h1 className="mb-2">User Information</h1>
          <button className="btn btn-danger" onClick={logout}>
            <ImSwitch />
          </button>
        </div>
        <ul className="list-unstyled">
          <li>
            Name: <strong>{user.name}</strong>
          </li>
          <li>
            Email address: <strong>{user.email}</strong>
          </li>
          <li>
            Mobile number: <strong>{user.mobile}</strong>
          </li>
        </ul>
        {/*  */}
        <hr />
        {blogs.length === 0 ? (
          <p className="text-center">No blogs to show</p>
        ) : (
          <div className="blogcard">
            {blogs.map((item, index) => {
              return (
                <BlogCard
                  key={index}
                  isUser={true}
                  blog={item}
                  fetchBlogs={userBlogs}
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

export default Profile;
