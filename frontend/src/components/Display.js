import React, {useState, useEffect} from 'react'

function Display() {
  const local = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`http://localhost:6969/api/getUserPref/${local.userId}`, {
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
      })
      .catch(err => {
        console.err(err);
      });
  }, []);
  return (
    <div>Display
      {JSON.stringify(data)}
    </div>
  )
}

export default Display