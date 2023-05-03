import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { setLogged, backendAPI } = useContext(AppContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
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
  const login = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    if (!email || !password) {
      setError(true);
      setMessage("Enter complete details");
    } else {
      try {
        const res = await fetch(backendAPI + "/post/bloguser/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await res.json();
        console.log(data);
        //
        if (res.status === 200) {
          setError(false);
          setMessage(data.message);
          localStorage.setItem("blogtoken", JSON.stringify(data.token));
          setLogged(true);
          setTimeout(() => {
            navigate("/", { replace: true });
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
          <h1>Login</h1>
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
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
          <div className="text-end">
            <p className={`mb-2 ${error ? "text-danger" : "text-success"}`}>
              {message}
            </p>
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
          </div>
        </form>
        <div className="col-md-7 mt-5">
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <p>New user?</p>
            <Link to="/signup" className="btn btn-primary">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
