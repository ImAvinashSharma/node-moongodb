import React, { useState, useRef, useEffect } from "react";

function Preferences({ local }) {
  const [changeSubmit, setChangeSubmit] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userPref, setUserPref] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:6969/api/getUserPref/${local.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token_header_key: local.token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        setUserPref(res[0]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [preference, setPreference] = useState(userPref);

  const handleSubmit = () => {
    setChangeSubmit(!changeSubmit);
    fetch(`http://localhost:6969/api/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      })
      .catch(err => {
        console.err(err);
      });
  };

  return (
    <>
      {" "}
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col m-6 mt-16 p-8 pl-16 pr-16 rounded-lg bg-neutral-200	 drop-shadow-2xl">
            <div className="flex justify-center m-2 p-2 text-xl"> Hey, {local && local.name} </div>
            <InputField changeSubmit={changeSubmit} preference={preference} setPreference={setPreference} name="Food" />
            <InputField changeSubmit={changeSubmit} preference={preference} setPreference={setPreference} name="Hobbies" />
            <InputField changeSubmit={changeSubmit} preference={preference} setPreference={setPreference} name="Tsize" />
            <InputField changeSubmit={changeSubmit} preference={preference} setPreference={setPreference} name="age" />
            <InputField changeSubmit={changeSubmit} preference={preference} setPreference={setPreference} name="Technology" />
            <InputField changeSubmit={changeSubmit} preference={preference} setPreference={setPreference} name="Experience" />
            {changeSubmit ? (
              <button className="bg-cyan-500 p-4 rounded-xl hover:bg-cyan-600 text-white" onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button
                className="bg-cyan-500 p-4 rounded-xl hover:bg-cyan-600 text-white"
                onClick={e => {
                  setChangeSubmit(!changeSubmit);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function InputField({ preference, setPreference, name, changeSubmit }) {
  const referance = useRef();
  if (changeSubmit === true) {
    return (
      <div className="flex mb-3">
        <input type="text" className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ref={referance} placeholder={name} defaultValue={preference[name]} />
        <button
          type="button"
          className="bg-emerald-500 p-2 rounded-lg text-white"
          onClick={() => {
            preference[name] = referance.current.value;
            setPreference(preference);
          }}
        >
          Add
        </button>
      </div>
    );
  }
  return (
    <div className="flex mb-3">
      <input disabled type="text" className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={name} defaultValue={preference[name]} />
    </div>
  );
}

export default Preferences;
