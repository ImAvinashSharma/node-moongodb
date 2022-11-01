import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Preferences from "../components/Preferences";
import Display from "../components/Display";

function Dashboard() {
  const [data, setData] = useState();

  const local = JSON.parse(localStorage.getItem("user"));

  if(local == null) {
    window.location.replace("/");
  }

  useEffect(() => {
    fetch(`http://localhost:6969/api/getUser/${local.userId}`,{
      method: 'GET',
      headers: {
        "token_header_key":local.token
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
  },[]);

  return (
    <div className="">
      <div className="">

      <Navbar data={data}/>
      <Preferences local={local} data={data}/>
      <Display local={local} />
      </div>
    </div>
  );
}

export default Dashboard;
