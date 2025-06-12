import React from "react";
import { Link } from "react-router-dom";
import BackBtn from "../component/BackBtn";

function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-evenly gap-10">
      <div className="px-10">
        <h1 className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] font-bold text-7xl w-full flex flex-col items-center justify-center bg-clip-text text-transparent">
          "Faster access. Smarter security. Powered by your face."
        </h1>
      </div>
      <div className="flex flex-row gap-5">
        <div>
          <img src="" alt="" />
          <Link to="/patientfacerecognition">
            {" "}
            <button className="shadow hover:shadow-md text-xl hover:scale-105 duration-200 ease-in-out bg-gradient-to-tr text-[#148023] font-bold from-[#d4fc79] to-[#96e6a1] px-6 py-3 rounded-full">
              {/* Patient Face Recognition */} Patient login
            </button>
          </Link>
        </div>
        <div>
          <img src="" alt="" />{" "}
          <Link to="/employee-attendance">
            <button className="shadow hover:scale-105 text-xl duration-200 ease-in-out hover:shadow-md bg-gradient-to-tr text-[#103e89] font-bold from-[#a1c4fd] to-[#c2e9fb] px-6 py-3 rounded-full">
              {/* Employee Face Recognition */} Employee Attendance
            </button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
