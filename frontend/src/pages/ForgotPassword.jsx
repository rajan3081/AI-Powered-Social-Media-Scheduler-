import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",

    newPassword: ""

  });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(

        "http://localhost:5000/api/auth/forgot-password",

        formData

      );

      toast.success("Password Updated 🔥");

      navigate("/login");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Something went wrong"

      );

    }

  };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-r
      from-purple-500
      to-pink-500
      p-6
    ">

      <div className="
        bg-white
        p-10
        rounded-3xl
        shadow-2xl
        w-full
        max-w-md
      ">

        <h1 className="
          text-4xl
          font-bold
          text-center
          mb-8
        ">
          Forgot Password 🔐
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="
              w-full
              border
              border-gray-300
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

          <button
            className="
              w-full
              bg-purple-500
              hover:bg-purple-600
              text-white
              py-4
              rounded-2xl
              font-semibold
            "
          >
            Update Password
          </button>

        </form>

      </div>

    </div>

  );

}

export default ForgotPassword;