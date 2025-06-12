import React, { useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";

function AttendanceConformation() {
  const { id, message } = useParams();
  const [employee, setEmployee] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [color, setColor] = useState(
    "bg-green-100 border border-green-400 text-green-800"
  );

  useEffect(() => {
    if (
      message === "Check-in successful" ||
      message === "Check-out successful" ||
      message === "Check-out updated successfully"
    ) {
      setColor("bg-green-100 border border-green-400 text-green-800");
    } else {
      setColor("bg-red-100 border border-red-400 text-red-800");
    }
  }, [message]);

  const fetchEmployee = async () => {
    try {
      const response = await AxiosInstance.get(`/employee/get-by-id/${id}`);
      setEmployee(response.data.employee);
      console.log(response);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };
  useEffect(() => {
    fetchEmployee();
    if (id) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [id]);

  setTimeout(() => {
    navigate(`/`);
  }, 2000);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {success ? (
        <div
          className={`animate-slideFadeIn ${color} px-10 py-10 rounded-3xl shadow-2xl text-center w-full max-w-4xl space-y-10`}
        >
          {/* ✅ Big Tick Icon with animation */}
          <div className="animate-bounceSlow text-[100px] drop-shadow-lg">
            {message === "Check-in successful" ||
            message === "Check-out successful" ||
            message === "Check-out updated successfully"
              ? "✅"
              : "❌"}
          </div>

          <h1 className="text-4xl font-extrabold tracking-wide">{message}</h1>
          {message === "Check-in successful" || "Check-out successful" ? (
            <p className="text-2xl font-medium">
              Your attendance record added successfully.
            </p>
          ) : null}

          {/* 🎯 Employee Profile Section */}
          <div className="flex items-center justify-center gap-6 bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full max-w-3xl mx-auto">
            <img
              src={employee?.profilePicture}
              alt={employee?.name}
              className={`${color}  w-24 h-24 rounded-full border-4  shadow-lg object-cover`}
            />
            <div className="space-y-1 text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {employee?.name}
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-700">
                  Employee ID:
                </span>{" "}
                {employee?.employeeId}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-700">Email:</span>{" "}
                {employee?.email}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md text-center max-w-md">
          {/* <h1 className="text-2xl font-bold mb-2">{message}</h1> */}
          <p>{error || "Unable to record attendance."}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default AttendanceConformation;
