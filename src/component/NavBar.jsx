import React from "react";
import logo from "../assets/facio_logo.png";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="w-full p-3 px-5 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-3 pr-4 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-full">
        <div className="p-2 rounded-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          <img src={logo} alt="Logo" className="w-7 h-7 p-1" />
        </div>
        <h1
          className="text-xl grd_color font-bold"
        >
          Face Recognition
        </h1>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/patientList");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
        >
          Patient List
        </button>
      </div>
    </div>
  );
}

export default NavBar;
