import { Navigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (role && role !== userRole) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
