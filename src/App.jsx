import React from "react";
//
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "bootswatch/dist/materia/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import { AppContextProvider } from "./context/AppContext";
import Profile from "./pages/Profile";
import ViewBlog from "./pages/ViewBlog";
import UpdateBlog from "./pages/UpdateBlog";

const App = () => {
  return (
    <AppContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/viewblog/:id" element={<ViewBlog />} />
        <Route path="/updateblog/:id" element={<UpdateBlog />} />
      </Routes>
    </AppContextProvider>
  );
};

export default App;
