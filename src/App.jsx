import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./component/NavBar";
import PatientList from "./component/PatientList";
import PatientFaceRecognition from "./pages/PatientFaceRecognition";
import PaientDashBoard from "./pages/PaientDashBoard";
import EmployeeAttendance from "./pages/EmployeeAttendance";
import AttendanceConformation from "./component/AttendanceConformation";
import AttendanceManger from "./pages/AttendanceManger";

function AppContent() {
  return (
    <div className="w-screen h-screen p-10 bg-gray-200 overflow-hidden">
      <div className="h-full w-full shadow-md rounded-lg bg-white">
        <NavBar />
        <hr className="mx-5" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patientList" element={<PatientList />} />
          <Route
            path="/patientfacerecognition"
            element={<PatientFaceRecognition />}
          />
          <Route path="/patientdashboard/:id" element={<PaientDashBoard />} />

          <Route path="/employee-attendance" element={<EmployeeAttendance />} />
          <Route
            path="/attendance-manager"
            element={<AttendanceManger />} />
          <Route
            path="/attendance-conformation/:id/:message"
            element={<AttendanceConformation />}
          />
        </Routes>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
