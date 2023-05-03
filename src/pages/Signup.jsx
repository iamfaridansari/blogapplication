import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const navigate = useNavigate();
  const { backendAPI } = useContext(AppContext);
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  //
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  //
  const signup = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password, confirmpassword } = input;
    if (!name || !email || !mobile || !password || !confirmpassword) {
      setError(true);
      setMessage("Enter complete details");
    } else if (password !== confirmpassword) {
      setError(true);
      setMessage("Password does not match");
    } else {
      try {
        const res = await fetch(backendAPI + "/post/bloguser/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            password,
          }),
        });
        const data = await res.json();
        console.log(data);
        //
        if (res.status === 200) {
          setError(false);
          setMessage(data.message);
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000);
        } else if (res.status !== 200) {
          setError(true);
          setMessage(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [message]);
  return (
    <div className="container py-4">
      <div className="row align-items-center justify-content-center">
        <form className="col-sm-7">
          <h1>Signup</h1>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              name="name"
              value={input.name}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              name="email"
              value={input.email}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Mobile number"
              name="mobile"
              value={input.mobile}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              name="confirmpassword"
              value={input.confirmpassword}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className="text-end">
            <p className={`mb-2 ${error ? "text-danger" : "text-success"}`}>
              {message}
            </p>
            <button className="btn btn-primary" onClick={signup}>
              Sign up
            </button>
          </div>
        </form>
        <div className="col-md-7 mt-5">
          <hr />
          <div className="d-flex align-items-center justify-content-between flex-sm-row flex-column gap-sm-0 gap-2">
            <p>Already have an account?</p>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
