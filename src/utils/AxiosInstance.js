import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  // baseURL:"https://hrmstest.quantumsharq.com/api" 
  baseURL: "https://karlos.qsisphysio.com/api",
});

export const AxiosFlask = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://flasktest.qsisphysio.com/",
  // baseURL: "https://karlosflask.qsisphysio.com/",
});

export default AxiosInstance;
