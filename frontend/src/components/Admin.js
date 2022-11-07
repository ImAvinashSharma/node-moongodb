import React, { useState, useRef } from "react";
import Navbar from "./Navbar";

function Admin() {
  const local = JSON.parse(localStorage.getItem("user"));
  if (local === null) {
    window.location.replace("/");
  }
  const [preference, setPreference] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:6969/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token_header_key: local.token
      },
      body: JSON.stringify(preference)
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        setSearchResult(res);
      });
  };

  return (
    <>
      <Navbar data={{ data: { admin: false } }} />
      <div className="flex justify-center">
        <form className="flex flex-col m-6 mt-16 p-8 pl-16 pr-16 rounded-lg bg-neutral-200	 drop-shadow-2xl">
          <p className="text-xl">Search</p>
          <InputField name="name" preference={preference} />
          <InputField name="userId" preference={preference} />
          <InputField name="Food" preference={preference} />
          <InputField name="Hobbies" preference={preference} />
          <InputField name="Tsize" preference={preference} />
          <InputField name="age" preference={preference} />
          <InputField name="Technology" preference={preference} />
          <InputField name="Experience" preference={preference} />
          <button onClick={handleSubmit} className="bg-cyan-500 p-4 rounded-xl hover:bg-cyan-600 text-white">
            Search
          </button>
        </form>
      </div>
      {searchResult !== [] ? (
        <div className="flex justify-center">
          {searchResult.map((data, idx) => {
            return (
              <div key={idx} className="flex flex-col m-6 mt-16 p-8 pl-16 pr-16 rounded-lg bg-neutral-200	 drop-shadow-2xl">
                <div className="text-xl">{data.name}</div>
                <div className="ml-2">{data.age}</div>
                <div className="ml-2">{data.Tsize}</div>
                <div className="ml-2">{data.Food}</div>
                <div className="ml-2">{data.Technology}</div>
                <div className="ml-2">{data.Hobbies}</div>
                <div className="ml-2">{data.Experience}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center">No user Found</div>
      )}
    </>
  );
}

function InputField({ name, preference }) {
  const referance = useRef();
  return (
    <div className="flex mb-3">
      <input type="text" className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ref={referance} placeholder={name} />
      <button
        type="button"
        className="bg-emerald-500 p-2 rounded-lg text-white"
        onClick={() => {
          preference[name] = referance.current.value;
        }}
      >
        Add
      </button>
    </div>
  );
}

export default Admin;
