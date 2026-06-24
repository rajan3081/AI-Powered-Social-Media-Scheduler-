import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBars,
  FaBell,
  FaMoon,
  FaSearch,
  FaSun,
  FaUserCircle,
  FaChevronDown
} from "react-icons/fa";

function Navbar({
  setSidebarOpen,
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode,
  notificationCount = 0,
  userName = "Manager"
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 transition hover:border-indigo-400 md:hidden"
          >
            <FaBars className="h-5 w-5" />
          </button>

          <div className="hidden items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-slate-300 md:flex">
            <FaSearch className="h-4 w-4" />
            <span className="text-sm font-medium text-slate-400">Welcome back,</span>
            <span className="font-semibold text-slate-100">{userName}</span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center px-2">
          <div className="relative w-full max-w-xl">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts, campaigns, or analytics"
              className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-900/80 pl-12 pr-4 text-sm text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/90 text-slate-100 transition hover:bg-slate-800"
          >
            <FaBell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute right-1 top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[0.65rem] font-semibold text-white">
                {notificationCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/90 text-slate-100 transition hover:bg-slate-800"
          >
            {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((value) => !value)}
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-slate-100 transition hover:border-indigo-400"
            >
              <FaUserCircle className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">{userName}</span>
              <FaChevronDown className="h-4 w-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-900"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-900"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;