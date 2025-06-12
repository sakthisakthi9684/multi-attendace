import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosFlask } from "../utils/AxiosInstance";

const EmployeeAttendance = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recognitionStatus, setRecognitionStatus] = useState("");
  const recognitionActiveRef = useRef(false);
  const processingRef = useRef(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();
    startRecognition("employee", "PS-1"); // Changed role to "employee" and clinicId to EMP-1 (adjust if needed)

    return () => {
      stopRecognition();
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecognition = async (role, clinicId) => {
    try {
      const response = await AxiosFlask.post(
        "/start_recognition",
        {
          role,
          clinicId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data.status === "started") {
        recognitionActiveRef.current = true;
        setRecognitionStatus(`Recognizing ${role}...`);
        intervalRef.current = setInterval(processFrame, 300);
      }
    } catch (err) {
      console.error("Error starting recognition:", err);
    }
  };

  const stopRecognition = async () => {
    try {
      await AxiosFlask.post("/stop_recognition");
      recognitionActiveRef.current = false;
      setRecognitionStatus("Recognition stopped");
    } catch (err) {
      console.error("Error stopping recognition:", err);
    }
  };

  const processFrame = async () => {
    if (
      !recognitionActiveRef.current ||
      processingRef.current ||
      !videoRef.current ||
      !canvasRef.current
    )
      return;

    processingRef.current = true;

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    canvasRef.current.toBlob(
      async (blob) => {
        const formData = new FormData();
        formData.append("frame", blob, "frame.jpg");

        try {
          const response = await AxiosFlask.post("/process_frame", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Response:", response);
          const data = response.data;
          console.log("Response data:", data);

          // console.log(response.data.message);
          // setMessage(response.data.message);
          if (response.data.status === "error") {
            setRecognitionStatus(response.data.message);
            return;
          }
          if (data.recognized) {
            setRecognitionStatus(`Recognized: ${data.name} (${data.role})`);
            setMessage(data.messages[0]);

            // Assuming the recognized data.name has an ID to navigate to
            const [name, id] = data.name.split("_");
            // stopRecognition();

            setTimeout(() => {
              // Navigate to employee attendance page or dashboard with recognized ID
              navigate(`/attendance-conformation/${id}/${data.messages[0]}`);
              return;
            }, 500);
          } else if (data.boxes && data.boxes.length > 0) {
            drawBoxes(data.boxes);
          }
        } catch (err) {
          console.error("Error processing frame:", err);
        } finally {
          processingRef.current = false;
        }
      },
      "image/jpeg",
      0.8
    );
  };

  const drawBoxes = (boxes) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    ctx.strokeStyle = "blue"; // Changed to blue for employee
    ctx.lineWidth = 2;

    boxes.forEach((box) => {
      const [x1, y1, x2, y2] = box;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="relative">
        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          muted
          playsInline
          className="border border-gray-300 rounded-md shadow-lg"
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="absolute top-0 left-0"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div className="mt-4 text-lg text-blue-700 font-semibold">
        {recognitionStatus}
      </div>
      <div className="mt-4 text-lg text-green-700 font-semibold">{message}</div>
    </div>
  );
};

export default EmployeeAttendance;
