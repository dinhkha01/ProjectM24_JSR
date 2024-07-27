// admin :   localhost:5173/admin/acccount
// user :    localhost:5173/home

import { Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import HomePage from "../pages/HomePage";
import Admin from "../pages/Admin";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/registor" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/homeUser" element={<HomePage/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </div>
  );
};

export default Router;
