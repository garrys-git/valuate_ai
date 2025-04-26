import { Navigate } from "react-router-dom";
import { useAuth } from "./auth_context";

const ProtectedRoute = ({ children }) => {
  const { auth, authLoading } = useAuth();

  if (authLoading) {
    // 👇 show nothing or a loading spinner while checking auth
    return null;
  }

  return auth?.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;