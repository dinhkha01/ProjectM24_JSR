

import Router from "./router";
import "./index.css";

function App() {
  console.log(import.meta.env.VITE_API_HOST);

  return (
    <div style={{backgroundColor:"black"}}>
      <Router />

    </div>
  );
}

export default App;
