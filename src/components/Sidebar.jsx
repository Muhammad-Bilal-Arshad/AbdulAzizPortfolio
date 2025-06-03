import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div className="lines flex flex-col gap-[4px] md:gap-[5px]">
        <button
          onClick={toggleSidebar}
          className="lines flex flex-col gap-[4px] md:gap-[5px] cursor-pointer z-50"
          aria-label="Toggle sidebar menu"
        >
          <div className="line w-10 h-1.5 bg-white"></div>
          <div className="line w-6 h-1.5 bg-white"></div>
          <div className="line w-4 h-1.5 bg-white"></div>
        </button>

        {/* Overlay */}
        <div
          onClick={toggleSidebar}
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        ></div>

        {/* Sidebar Menu */}
        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-8 flex flex-col gap-8 text-xl font-semibold">
            <button
              onClick={toggleSidebar}
              className="self-end text-3xl mb-8"
              aria-label="Close sidebar"
            >
              &times;
            </button>
             <Link to="/" className="hover:text-yellow-400" onClick={toggleSidebar}>
             Home
            </Link>
            <Link to="/contact" className="hover:text-yellow-400" onClick={toggleSidebar}>
              Contact
            </Link>
              <Link to="/work" className="hover:text-yellow-400" onClick={toggleSidebar}>
              Work
            </Link>
            <Link to="/about" className="hover:text-yellow-400" onClick={toggleSidebar}>
              About
            </Link>
            {/* Add more links as needed */}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
