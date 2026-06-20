import {
  FaHome,
  FaPlus,
  FaChartBar,
  FaMoon,
  FaSignOutAlt,
  FaCalendarAlt,
  FaTimes, 
  FaUserShield
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen
}) {

  const navigate = useNavigate();

  const logoutUser = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <>

      {/* OVERLAY */}

      {
        sidebarOpen && (

          <div
            onClick={() => setSidebarOpen(false)}
            className="
              fixed
              inset-0
              bg-black/50
              z-40
              md:hidden
            "
          />

        )
      }

      {/* SIDEBAR */}

      <div
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-64
          bg-gray-900
          text-white
          p-6
          flex
          flex-col
          justify-between
          z-50
          transform
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        {/* TOP */}

        <div>

          <div className="
            flex
            items-center
            justify-between
            mb-12
          ">

            <h1 className="
              text-3xl
              font-bold
              text-blue-400
            ">
              Scheduler
            </h1>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-2xl"
            >
              <FaTimes />
            </button>

          </div>

          <div className="space-y-5">

            <button
              onClick={() => {
                setActiveSection("dashboard");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaHome />
              Dashboard
            </button>

            <button
              onClick={() => {
                setActiveSection("create");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaPlus />
              Create Post
            </button>

            <button
              onClick={() => {
                setActiveSection("analytics");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaChartBar />
              Analytics
            </button>

            <button
              onClick={() => {
                setActiveSection("calendar");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 hover:text-blue-400 transition"
            >
              <FaCalendarAlt />
              Calendar
            </button>
            <button
  onClick={() => {
    navigate("/admin");
    setSidebarOpen(false);
  }}
  className="
    flex items-center gap-3
    hover:text-blue-400
    transition
  "
>
  <FaUserShield />
  Admin
</button>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="space-y-5">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              flex items-center gap-3
              hover:text-yellow-400
              transition
            "
          >
            <FaMoon />
            Dark Mode
          </button>

          <button
            onClick={logoutUser}
            className="
              flex items-center gap-3
              hover:text-red-400
              transition
            "
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </>

  );

}

export default Sidebar;