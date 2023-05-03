import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const { auth, getUser, userid, backendAPI } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    auth();
  }, []);
  useEffect(() => {
    getUser();
  }, [userid]);
  //
  const [blog, setBlog] = useState({
    title: "",
    body: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };
  //
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  //
  const postBlog = async (e) => {
    e.preventDefault();
    const { title, body } = blog;
    if (!title || !body) {
      setError(true);
      setResponse("Enter complete details");
    } else {
      try {
        axios
          .post(backendAPI + "/post/blog/postblog", {
            title,
            body,
            user: userid,
          })
          .then((res) => {
            if (res.status === 200) {
              setBlog({
                title: "",
                body: "",
              });
              setError(false);
              setResponse(res.data.message);
              setTimeout(() => {
                navigate("/", { replace: true });
              }, 2000);
            } else if (res.status !== 200) {
              setError(true);
              setResponse(res.data.message);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  useEffect(() => {
    if (response !== "") {
      setTimeout(() => {
        setResponse("");
      }, 2000);
    }
  }, [response]);
  return (
    <div>
      <form className="container py-4">
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={blog.title}
            onChange={handleInput}
          />
        </div>
        <div className="mb-2">
          <textarea
            className="blogbody form-control"
            placeholder="Body"
            name="body"
            value={blog.body}
            onChange={handleInput}
          ></textarea>
        </div>
        <div className="text-end">
          <p className={`mb-2 ${error ? "text-danger" : "text-success"}`}>
            {response}
          </p>
          <button className="btn btn-primary" onClick={postBlog}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
