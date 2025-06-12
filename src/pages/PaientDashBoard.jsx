import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PatientDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [exercise, setExercise] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatient = async () => {
    try {
      const response = await AxiosInstance.get(`/patient/patient/${id}`);
      setPatient(response.data.patient);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  };

  const fetchExercise = async () => {
    try {
      const response = await AxiosInstance.get(`/exercise/get-by/${id}`);
      setExercise(response.data.getExercise);
    } catch (error) {
      console.error("Error Fetching Exercise:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchPatient(), fetchExercise()]);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 font-medium">Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
              <span className="text-2xl">🧑‍⚕️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Patient Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive patient health overview
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="mr-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow transition"
              aria-label="Go Back"
              type="button"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 ">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📝</span>
              <h2 className="text-xl font-semibold text-white">
                Patient Information
              </h2>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-600">🆔</span>
                  <span className="font-medium text-gray-700">Patient ID</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {patient?.patientId || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600">👤</span>
                  <span className="font-medium text-gray-700">Full Name</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {patient?.name || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-purple-600">🎂</span>
                  <span className="font-medium text-gray-700">Age</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {patient?.age || "N/A"} years
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-pink-600">⚧️</span>
                  <span className="font-medium text-gray-700">Gender</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {(patient?.gender === "M" && "Male") ||
                    (patient?.gender === "F" && "Female") ||
                    "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-600">📞</span>
                  <span className="font-medium text-gray-700">Phone</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {patient?.phone || "N/A"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-indigo-600">🏠</span>
                  <span className="font-medium text-gray-700">Address</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 break-words">
                  {patient?.address || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercises Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏋️‍♂️</span>
                <h2 className="text-xl font-semibold text-white">
                  Assigned Exercises
                </h2>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                <span className="text-white font-medium">
                  {exercise.length} Exercise{exercise.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {exercise.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-gray-400">🏃‍♂️</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Exercises Assigned
                </h3>
                <p className="text-gray-500">
                  This patient hasn't been assigned any exercises yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exercise.map((item, index) => (
                  <div
                    key={item._id}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Exercise Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {item.NameofExercise}
                      </h3>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Video Container */}
                      <div className="relative bg-black rounded-lg overflow-hidden">
                        <video
                          className="w-full h-48 object-cover"
                          controls
                          preload="metadata"
                          src={item.url}
                          poster=""
                          controlsList="nodownload"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>

                      {/* Exercise Details Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Category
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {item.Categories}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Reps
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {item.Reps}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Sets
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {item.Sets}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Days
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {item.NoofDays}
                          </p>
                        </div>
                      </div>

                      {/* Payment and Expiry */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-600">💰</span>
                            <div>
                              <p className="text-xs font-medium text-green-700 uppercase tracking-wide">
                                Payment
                              </p>
                              <p className="text-lg font-bold text-green-800">
                                ₹{item.payment}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border border-red-200">
                          <div className="flex items-center space-x-2">
                            <span className="text-red-600">⏰</span>
                            <div>
                              <p className="text-xs font-medium text-red-700 uppercase tracking-wide">
                                Expires On
                              </p>
                              <p className="text-sm font-semibold text-red-800">
                                {new Date(
                                  item.VideoExpiredate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
