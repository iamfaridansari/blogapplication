import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const { auth, getUser, userid, backendAPI } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    auth();
    getblog();
  }, []);
  useEffect(() => {
    getUser();
  }, [userid]);
  //
  const { id } = useParams();
  const getblog = async () => {
    try {
      const res = await fetch(backendAPI + `/get/blog/viewblog/${id}`);
      const data = await res.json();
      console.log(data);
      //
      if (res.status === 200) {
        setBlog({
          title: data.title,
          body: data.body,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const updateblog = async (e) => {
    e.preventDefault();
    const { title, body } = blog;
    if (!title || !body) {
      setError(true);
      setResponse("Enter complete details");
    } else {
      try {
        const res = await fetch(backendAPI + `/update/blog/updateblog/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            body,
            user: userid,
          }),
        });
        const data = await res.json();
        console.log(data);
        //
        if (res.status === 200) {
          setBlog({
            title: "",
            body: "",
          });
          setError(false);
          setResponse(data.message);
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
        } else if (res.status !== 200) {
          setError(true);
          setResponse(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
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
          <button className="btn btn-primary" onClick={updateblog}>
            update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
