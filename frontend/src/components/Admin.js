import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Admin() {
  const [data, setData] = useState(null);

  const local = JSON.parse(localStorage.getItem("user"));

  if (local === null) {
    window.location.replace("/");
  }

  useEffect(() => {
    fetch(`http://localhost:6969/api/getAllPref`, {
      method: "GET",
      headers: {
        token_header_key: local.token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setData(res);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:6969/api/getAllUser`, {
      method: "GET",
      headers: {
        token_header_key: local.token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      });
  }, []);

  return (
    <div>
      <Navbar data={data} />
      {JSON.stringify(data)}
      {/* Form with all params for serach */}
    </div>
  );
}

export default Admin;
