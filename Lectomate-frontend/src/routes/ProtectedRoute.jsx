import { Navigate } from "react-router-dom";
import authService from "../services/authService";

export default function ProtectedRoute({ children }) {
  const user = authService.getCurrentUser();
  const token = user?.access_token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
