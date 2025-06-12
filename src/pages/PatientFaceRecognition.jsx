import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosFlask } from "../utils/AxiosInstance";
import BackBtn from "../component/BackBtn";

const PatientFaceRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState("");
  const [recognitionPatient, setRecognitionPatient] = useState("");
  const recognitionActiveRef = useRef(false);
  const processingRef = useRef(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

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
    startRecognition("patient", "PS-1");

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
          action: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      if (data.status === "started") {
        recognitionActiveRef.current = true;
        setRecognitionPatient(`Recognizing ${role}...`);
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
      setRecognitionPatient("Recognition stopped");
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

          const data = await response.data;

          if (data.recognized) {
            setRecognitionPatient(`Recognized: ${data.name} (${data.role})`);

            const [name, id] = data.name.split("_");

            setTimeout(() => {
              navigate(`/patientdashboard/${id}`);
            }, 2000);
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

    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;

    boxes.forEach((box) => {
      const [x1, y1, x2, y2] = box;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    });
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="flex justify-end w-11/12">
          <BackBtn />
        </div>
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
        <div className="mt-4 text-lg text-green-700 font-semibold">
          {recognitionPatient}
        </div>
      </div>
    </>
  );
};

export default PatientFaceRecognition;
