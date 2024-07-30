import Router from "./router";
import "./index.css";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { login } from "./service/Login-Register/Login_Register";

function App() {
  console.log(import.meta.env.VITE_API_HOST);

  return (
    <div>
      <Router />
      {/* <Upload /> */}
    </div>
  );
}

export default App;
