import React, { useState } from "react";
import Login from "../pages/login";
import Register from "../pages/Register";

function Home() {
  const [change, setChange] = useState(true);
  const data = localStorage.getItem("user");
  if (data) {
    window.location.replace("/dashboard");
    return "";
  }
  return (
    <div>
      {change ? <Login change={change} setChange={setChange}/> : <Register change={change} setChange={setChange}/>}
    </div>
  );
}

export default Home;
