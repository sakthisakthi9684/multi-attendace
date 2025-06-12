import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      className="pr-2 py-1 bg-gray-700 hover:bg-gray-800 text-white rounded transition-colors duration-200 shadow inline-flex items-center gap-0"
      type="button"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft />
      Back
    </button>
  );
};

export default BackBtn;
