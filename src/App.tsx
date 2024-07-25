
import Navbar from "./components/Navbar";
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
