import React from "react";
import { Link } from "react-router-dom";
import BackBtn from "../component/BackBtn";

function AttendanceManger() {
  return (
    <div className="h-full flex flex-col items-center justify-evenly gap-4">
      <div className="flex justify-end w-11/12">
        <BackBtn />
      </div>
      <div className="px-10">
        <h1 className="bg-gradient-to-br from-[#71ac63] to-[#7bfe00] font-bold text-7xl w-full flex flex-col items-center justify-center bg-clip-text text-transparent">
          "WELCOME TO ATTENDANCE MANAGER"
        </h1>
      </div>
      <div className="flex flex-row gap-14">
        <div>
          <img src="" alt="" />
          <Link to="/employee-attendance/checkin">{" "}
          <button className="shadow hover:scale-105 text-xl duration-200 ease-in-out hover:shadow-md bg-gradient-to-tr text-[#103e89] font-bold from-[#a1c4fd] to-[#c2e9fb] p-4 rounded-xl">
            Check In
          </button>{" "}
          </Link>
        </div>
        <div>
          <img src="" alt="" />
          <Link to="/employee-attendance/checkout">
          <button className="shadow hover:scale-105 text-xl duration-200 ease-in-out hover:shadow-md bg-gradient-to-tr text-[#103e89] font-bold from-[#a1c4fd] to-[#c2e9fb] p-4 rounded-xl">
            {/* Employee Face Recognition */} Check Out
          </button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AttendanceManger;
