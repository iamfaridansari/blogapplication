import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, isUser, fetchBlogs }) => {
  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`/api/delete/blog/deleteblog/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        fetchBlogs();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card border-secondary mb-3">
      <div className="card-header d-flex align-items-start justify-content-between">
        <div>
          <Link to={`viewblog/${blog._id}`}>
            <h2>{blog.title}</h2>
          </Link>
          <small className="text-muted">{blog.createdAt}</small>
        </div>
        {isUser ? (
          <div className="d-flex align-items-center justify-content-between gap-2">
            <Link to={`/updateblog/${blog._id}`} className="icon editbtn">
              <FaPen />
            </Link>
            <div
              className="icon deletebtn"
              onClick={() => deleteBlog(blog._id)}
            >
              <FaTrash />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="card-body">
        <p>{blog.body}</p>
      </div>
    </div>
  );
};

export default BlogCard;
