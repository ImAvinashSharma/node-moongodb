import React, { useState } from "react";

function Navbar({ data }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
  };
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-amber-500 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <p
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          >
            Preferences App
          </p>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              {" "}
              <p className="px-3 py-2 flex items-center text-s font-bold leading-snug text-white">
                {data && data[0].data.name}
              </p>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                onClick={handleLogout}
                href="/"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
