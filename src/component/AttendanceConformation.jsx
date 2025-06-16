import React, { use, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const AttendanceConformation = () => {
  const { id, message } = useParams();
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (message.length === 0) {
      setMessages(message);
    }
  }, [message]);
  const [employee, setEmployee] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [color, setColor] = useState("");

  const messageMap = {
    "Check-in successfully": {
      text: "Your attendance record added successfully.",
      color: "bg-green-100 border border-green-400 text-green-800",
      icon: "✅",
    },
    "Check-out successfully": {
      text: "Your attendance record added successfully.",
      color: "bg-green-100 border border-green-400 text-green-800",
      icon: "✅",
    },
    "Action denied.check in.": {
      text: "Check-in has already been recorded. You cannot check in again.",
      color: "bg-orange-100 border border-orange-400 text-orange-800",
      icon: "❗",
    },
    "Action denied.check out.": {
      text: "Please ensure you are checked in before checking out",
      color: "bg-orange-100 border border-orange-400 text-orange-800",
      icon: "❗",
    },
    "Action denied. Check-out already exists.": {
      text: "You have already checked out.",
      color: "bg-orange-100 border border-orange-400 text-orange-800",
      icon: "❗",
    },
  };

  const messageInfo = messageMap[message] || {
    text: "An unexpected error occurred.",
    color: "bg-red-100 border border-red-400 text-red-800",
    icon: "❌",
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await AxiosInstance.get(`/employee/get-by-id/${id}`);
        setEmployee(response.data.employee);
        setSuccess(true);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setSuccess(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate("/")}
        className="mr-4 mb-4    px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow transition ittems-start "
        aria-label="Go Back"
        type="button"
      >
        ← Back
      </button>
      {success ? (
        <div
          className={`animate-slideFadeIn ${messageInfo.color} px-10 py-10 rounded-3xl shadow-2xl text-center w-full max-w-4xl space-y-10`}
        >
          {/* Icon */}
          <div className="animate-bounceSlow text-[100px] drop-shadow-lg">
            {messageInfo.icon}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-wide">
            {message.startsWith("Action denied.") ? "Action denied." : message}
          </h1>

          {/* Message Text */}
          <p className="text-2xl font-medium">{messageInfo.text}</p>

          {/* Employee Info */}
          <div className="flex items-center justify-center gap-6 bg-white rounded-xl shadow-md border border-gray-200 p-6 w-full max-w-3xl mx-auto">
            <img
              src={employee?.profilePicture}
              alt={employee?.name}
              className={`${messageInfo.color} w-24 h-24 rounded-full border-4 shadow-lg object-cover`}
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
          <p>Unable to record attendance.</p>
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
};

export default AttendanceConformation;
