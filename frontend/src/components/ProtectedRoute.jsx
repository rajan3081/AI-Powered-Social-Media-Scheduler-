import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requireRole }) {

  const token = localStorage.getItem("token");

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!token) {

    return <Navigate to="/login" />;

  }

  if (requireRole) {

    const role = user?.role;

    const normalizedRole = (role || "").toString().toLowerCase();

    if (normalizedRole !== requireRole.toString().toLowerCase()) {

      return <Navigate to="/dashboard" />;

    }

  }

  return children;

}

export default ProtectedRoute;
