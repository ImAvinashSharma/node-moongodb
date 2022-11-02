import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Admin() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
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
        setUser(res);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar data={data} />
      <div className="flex justify-center">
        <form className="flex flex-col m-6 mt-16 p-8 pl-16 pr-16 rounded-lg bg-neutral-200	 drop-shadow-2xl">
          <p className="text-xl">Search</p>
          <InputField name="Food" />
          <InputField name="Hobbies" />
          <InputField name="Tsize" />
          <InputField name="age" />
          <InputField name="Technology" />
          <InputField name="Experience" />
          <button onClick={handleSubmit} className="bg-cyan-500 p-4 rounded-xl hover:bg-cyan-600 text-white">
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-center">No user Found</div>
      {user &&
        user.map((data, id) => {
          return (
            <div id={id}>
              {data.data.name} {"  "}
              {data.data.email}
            </div>
          );
        })}
    </>
  );
}

function InputField({ name }) {
  return (
    <div className="flex mb-3">
      <input className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={name} />
    </div>
  );
}

export default Admin;
