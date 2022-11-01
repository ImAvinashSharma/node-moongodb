import React, { useState, useRef } from "react";

function Preferences({ local, data }) {
  const [preference, setPreference] = useState({
    food: "",
    hobbies: "",
    tSize: "",
    age: "",
    technology: "",
    experience: "",
  });
  const foodRef = useRef();
  const hobbiesRef = useRef();
  const tSizeRef = useRef();
  const ageRef = useRef();
  const technologyRef = useRef();
  const experienceRef = useRef();
  const handleSubmit = () => {
    fetch(`http://localhost:6969/api/addPref`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token_header_key: local.token,
      },
      body: JSON.stringify({
        preference,
        name: data[0].data.name,
        userId : local.userId
      }),
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
  };
  return (
    <div className="flex flex-col">
      <input type="text" ref={foodRef} placeholder="Food habits" />
      <button
        type="button"
        className="bg-slate-500"
        value="add"
        onClick={() => {
          preference.food = foodRef.current.value;
          setPreference(preference);
          // console.log(preference);
        }}
      >add</button>
      <input type="text" ref={hobbiesRef} placeholder="hobbies" />
      <button
        type="button"
        value="add"
        onClick={() => {
          preference.hobbies = hobbiesRef.current.value;
          setPreference(preference);
          // console.log(preference);
        }}
      >add</button>
      <input type="text" ref={tSizeRef} placeholder="Tshirt size" />
      <button
        type="button"
        value="add"
        onClick={() => {
          preference.tSize = tSizeRef.current.value;
          setPreference(preference);
          // console.log(preference);
        }}
      >add</button>
      <input type="text" ref={ageRef} placeholder="Age" />
      <button
        type="button"
        value="add"
        onClick={() => {
          preference.age = ageRef.current.value;
          setPreference(preference);
        }}
      >add</button>
      <input type="text" ref={technologyRef} placeholder="Technologies Known" />
      <button
        type="button"
        value="add"
        onClick={() => {
          preference.technology = technologyRef.current.value;
          setPreference(preference);
        }}
      >add</button>
      <input type="text" ref={experienceRef} placeholder="Experience" />
      <button
        type="button"
        value="add"
        onClick={() => {
          preference.experience = experienceRef.current.value;
          setPreference(preference);
        }}
      >add</button>
      <button className="bg-cyan-400" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Preferences;
