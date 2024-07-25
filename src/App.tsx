import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Router from "./router";

function App() {
  console.log(import.meta.env.VITE_API_HOST);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
