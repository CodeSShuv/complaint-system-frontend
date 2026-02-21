import { Navigate } from "react-router-dom";

export default function RoleRoute({ user, allowedRoles, children }) {
  if (!user) {
    return <Navigate to="/login" />;
  }
  { console.log("User Role:", user.role); }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}