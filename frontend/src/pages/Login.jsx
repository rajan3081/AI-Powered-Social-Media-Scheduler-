import { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",

    password: ""

  });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://localhost:5000/api/auth/login",

        formData

      );

      console.log(response.data);

      // SAVE TOKEN

      localStorage.setItem(

        "token",

        response.data.token

      );

      // SAVE USER

      localStorage.setItem(

        "user",

        JSON.stringify(response.data.user)

      );

      toast.success("Login Successful 🚀");

      navigate("/role-selection");

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Login Failed"

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
      from-blue-500
      to-purple-600
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
          Login 🚀
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
            name="password"
            placeholder="Enter Password"
            value={formData.password}
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
          <div className="text-right">

  <span
    onClick={() => navigate("/forgot-password")}
    className="
      text-blue-500
      cursor-pointer
      text-sm
    "
  >
    Forgot Password?
  </span>

</div>

          <button
            className="
              w-full
              bg-blue-500
              hover:bg-blue-600
              text-white
              py-4
              rounded-2xl
              font-semibold
              transition
            "
          >
            Login
          </button>

        </form>

        <p className="
          text-center
          mt-6
          text-gray-500
        ">
          Don't have an account?

          <Link
            to="/register"
            className="
              text-blue-500
              ml-2
              font-semibold
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;