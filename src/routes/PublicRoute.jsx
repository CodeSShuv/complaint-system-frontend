import { Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/UserContext";
const PublicRoute = ({ children }) => {
  const { user, setUser } = useContext(userContext);
  if (user) {
    return <Navigate to="/user-dashboard" replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
