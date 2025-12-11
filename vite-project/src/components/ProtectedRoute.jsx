// ProtectedRoute.jsx
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userRole = sessionStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== userRole) {
    // Only allow if user role matches
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
