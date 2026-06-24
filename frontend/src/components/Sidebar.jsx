import {
  FaHome,
  FaPlus,
  FaChartBar,
  FaMoon,
  FaSignOutAlt,
  FaCalendarAlt,
  FaTimes,
  FaUserShield,
  FaComments,
  FaAngleLeft,
  FaAngleRight,
  FaRocket
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed
}) {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: FaHome },
    { label: "Create Post", key: "create", icon: FaPlus },
    { label: "Analytics", key: "analytics", icon: FaChartBar },
    { label: "Calendar", key: "calendar", icon: FaCalendarAlt }
  ];

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/70 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen flex-col justify-between overflow-hidden border-r border-slate-800/70 bg-slate-950/95 px-4 pb-6 pt-4 text-slate-100 shadow-2xl transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-72"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          <div className="flex items-center justify-between gap-3 px-1">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-linear-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-violet-500/20">
                <FaRocket className="h-5 w-5" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Social Flow</p>
                  <h1 className="text-xl font-semibold text-white">Scheduler</h1>
                </div>
              )}
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-200 hover:text-white"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-2 px-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`group flex items-center gap-4 rounded-3xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  } ${sidebarCollapsed ? "justify-center px-0" : "justify-start"}`}
                >
                  <Icon className="h-5 w-5" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}

            {(() => {
              const storedUser = localStorage.getItem("user");
              const user = storedUser ? JSON.parse(storedUser) : null;
              const isAdmin = user?.role === "admin" || user?.role === "Admin" || user?.role === "ADMIN";

              if (!isAdmin) return null;

              return (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setSidebarOpen(false);
                  }}
                  className={`group flex items-center gap-4 rounded-3xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white ${sidebarCollapsed ? "justify-center px-0" : "justify-start"}`}
                >
                  <FaUserShield className="h-5 w-5" />
                  {!sidebarCollapsed && <span>Admin</span>}
                </button>
              );
            })()}


            <button
              onClick={() => {
                navigate("/chat");
                setSidebarOpen(false);
              }}
              className={`group flex items-center gap-4 rounded-3xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white ${sidebarCollapsed ? "justify-center px-0" : "justify-start"}`}
            >
              <FaComments className="h-5 w-5" />
              {!sidebarCollapsed && <span>Chat</span>}
            </button>
          </nav>
        </div>

        <div className={`${sidebarCollapsed ? "flex flex-col items-center gap-3" : "flex flex-col gap-4"}`}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group inline-flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            <FaMoon className="h-5 w-5" />
            {!sidebarCollapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>

          <button
            onClick={logoutUser}
            className="group inline-flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-white"
          >
            <FaSignOutAlt className="h-5 w-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>

          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="mt-2 inline-flex items-center justify-center rounded-3xl bg-slate-900/90 p-3 text-slate-200 transition hover:bg-slate-800"
          >
            {sidebarCollapsed ? <FaAngleRight className="h-4 w-4" /> : <FaAngleLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
