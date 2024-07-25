// admin :   localhost:5173/admin/acccount
// user :    localhost:5173/home
import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Navbar from "../components/Navbar";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/registor" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/homeUser" element={<Navbar/>} />
      </Routes>
    </div>
  );
};

export default Router;
