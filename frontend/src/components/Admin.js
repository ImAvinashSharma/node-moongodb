import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Admin() {
  const local = JSON.parse(localStorage.getItem("user"));
  if (local === null) {
    window.location.replace("/");
  }
  let prePreference = {
    Food: "",
    Hobbies: "",
    Tsize: "",
    age: "",
    Technology: "",
    Experience: ""
  };
  const [preference, setPreference] = useState(prePreference);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:6969/api/search`, {
      method: "POST",
      headers: {
        token_header_key: local.token
      },
      body: JSON.stringify({
        preference,
        name: local.name,
        userId: local.userId
      })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      });
  };

  return (
    <>
      <Navbar data={{ data: { admin: false } }} />
      <div className="flex justify-center">
        <form className="flex flex-col m-6 mt-16 p-8 pl-16 pr-16 rounded-lg bg-neutral-200	 drop-shadow-2xl">
          <p className="text-xl">Search</p>
          <InputField name="Food" preference={preference} setPreference={setPreference} />
          <InputField name="Hobbies" preference={preference} setPreference={setPreference} />
          <InputField name="Tsize" preference={preference} setPreference={setPreference} />
          <InputField name="age" preference={preference} setPreference={setPreference} />
          <InputField name="Technology" preference={preference} setPreference={setPreference} />
          <InputField name="Experience" preference={preference} setPreference={setPreference} />
          <button onClick={handleSubmit} className="bg-cyan-500 p-4 rounded-xl hover:bg-cyan-600 text-white">
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-center">No user Found</div>
    </>
  );
}

function InputField({ name, preference, setPreference }) {
  return (
    <div className="flex mb-3">
      <input
        type="text"
        className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={name}
        onChange={e => {
          preference[name] = e.target.value;
          console.log(preference);
          setPreference(...preference, preference);
        }}
      />
    </div>
  );
}

export default Admin;
