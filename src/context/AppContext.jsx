import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendAPI = "https://server-application.onrender.com/api";
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    blogs: [],
  });
  const [userid, setUserid] = useState("");
  //
  const navigate = useNavigate();
  const auth = async () => {
    const authtoken = JSON.parse(localStorage.getItem("blogtoken"));
    try {
      const res = await fetch(backendAPI + `/bloguser/auth`, {
        method: "GET",
        headers: {
          "auth-token": `Bearer ${authtoken}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (res.status !== 200) {
        navigate("/login", { replace: true });
      } else if (res.status === 200) {
        setLogged(true);
        setUserid(data.user.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //
  const getUser = async () => {
    if (userid !== "") {
      try {
        axios
          .post(backendAPI + "/post/bloguser/getuser", {
            id: userid,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              setUser({
                id: res.data.id,
                name: res.data.name,
                email: res.data.email,
                mobile: res.data.mobile,
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  //
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      axios.get(backendAPI + "/get/blog/getblogs").then((res) => {
        if (res.status === 200) {
          setBlogs(res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        logged,
        setLogged,
        user,
        setUser,
        auth,
        getUser,
        userid,
        fetchBlogs,
        blogs,
        setBlogs,
        backendAPI,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
