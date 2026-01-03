import { Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/UserContext";
const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(userContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
