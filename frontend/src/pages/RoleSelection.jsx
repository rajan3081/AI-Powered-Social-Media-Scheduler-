import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserTie, FaUser } from "react-icons/fa";

function RoleSelection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleRoleSelection = async (selectedRole) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/select-role",
        { role: selectedRole },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update user in localStorage
      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user")),
        role: selectedRole
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(`Welcome ${selectedRole === "admin" ? "Admin" : "Customer"}! 🎉`);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to select role");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your role to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Admin Card */}
          <div
            onClick={() => handleRoleSelection("admin")}
            disabled={loading}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-800 rounded-lg p-8 hover:bg-slate-750 transition">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-600 rounded-full">
                  <FaUserTie className="text-white text-4xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                Admin
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Manage all posts, users, and analytics. Full control over the platform.
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRoleSelection("admin");
                }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "Select Admin"}
              </button>
            </div>
          </div>

          {/* Customer Card */}
          <div
            onClick={() => handleRoleSelection("customer")}
            disabled={loading}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-slate-800 rounded-lg p-8 hover:bg-slate-750 transition">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-600 rounded-full">
                  <FaUser className="text-white text-4xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                Customer
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Schedule and manage your social media posts easily.
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRoleSelection("customer");
                }}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "Select Customer"}
              </button>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="text-center text-gray-500 text-sm">
          <p>You can change this later in your profile settings</p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
