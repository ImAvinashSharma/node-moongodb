import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Preferences from "../components/Preferences";

function Dashboard() {
  const [data, setData] = useState();
  const local = JSON.parse(localStorage.getItem("user"));
  if (local === null || local === undefined || local.length === 0 || local.userId === undefined || local.userId === null) {
    window.location.replace("/");
  }
  useEffect(() => {
    fetch(`http://localhost:6969/api/getUser/${local.userId}`, {
      method: "GET",
      headers: {
        token_header_key: local.token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setData(res.data[0]);
      })
      .catch(err => {
        alert(err);
      });
  }, []);

  return (
    <div>
      <Navbar data={data} />
      <div className="justify-items-center">
        <Preferences local={local} name={local.name} />
      </div>
    </div>
  );
}

export default Dashboard;
