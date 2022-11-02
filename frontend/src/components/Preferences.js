import React, { useState, useRef, useEffect } from "react";

function Preferences({ local, data }) {
  const [userPref,setUserPref] = useState();
  useEffect(()=>{
        fetch(`http://localhost:6969/api/getUserPref${local.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token_header_key": local.token,
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.err(err);
      });
  },[])
  const [preference, setPreference] = useState({
    Food: "",
    Hobbies: "",
    Tsize: "",
    age: "",
    Technology: "",
    Experience: "",
  });
  const handleSubmit = () => {
    console.log(preference);
    // fetch(`http://localhost:6969/api/addPref`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     token_header_key: local.token,
    //   },
    //   body: JSON.stringify({
    //     preference,
    //     name: data.data[0].data.name,
    //     userId: local.userId,
    //   }),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.err(err);
    //   });
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col m-6 mt-16 p-8 pl-16 pr-16 rounded-lg bg-neutral-200	 drop-shadow-2xl">
        <div className="flex justify-center m-2 p-2 text-xl">
          Hey, {data && data.data[0].data.name}
        </div>
        <InputField
          preference={preference}
          setPreference={setPreference}
          name="Food"
        />
        <InputField
          preference={preference}
          setPreference={setPreference}
          name="Hobbies"
        />
        <InputField
          preference={preference}
          setPreference={setPreference}
          name="Tsize"
        />
        <InputField
          preference={preference}
          setPreference={setPreference}
          name="age"
        />
        <InputField
          preference={preference}
          setPreference={setPreference}
          name="Technology"
        />
        <InputField
          preference={preference}
          setPreference={setPreference}
          name="Experience"
        />
        <button
          className="bg-cyan-500 p-4 rounded-xl hover:bg-cyan-600 text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function InputField({ preference, setPreference, name }) {
  const referance = useRef();
  return (
    <div className="flex mb-3">
      <input
        type="text"
        className="mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        ref={referance}
        placeholder={name}
      />
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

export default Preferences;
