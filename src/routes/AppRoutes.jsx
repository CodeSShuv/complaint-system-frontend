import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import NotFound from "../pages/NotFound";
import Registerpage from "../pages/Registerpage";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Dashboard from "../pages/Dashboard";
import userContext from "../context/UserContext";
import RoleRoute from "./RoleRoute";
import View from "../pages/View";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "../admin/AdminPanel";
import VerifyEmail from "../pages/EmailVerificationPage";
import ComplaintDetail from "../pages/ComplaintDetail";
const AppRoutes = () => {
  const { user } = useContext(userContext);
  // if (user === null) {
  //   return (
  //     <Routes>
  //       <Route path={"/"} element={<Homepage />} />
  //       <Route path={"/login"} element={<Loginpage />} />
  //       <Route path={"/register"} element={<Registerpage />} />
  //       <Route path={"*"} element={<NotFound />} />
  //       <Route path="/verify-email/:token" element={<VerifyEmail />} />
  //     </Routes>
  //   );
  // }
  return (
    <>

      <Routes>
        <Route path={"/"} element={<Homepage />} />

        <Route
          path={"/login"}
          element={
            <PublicRoute>
              <Loginpage />
            </PublicRoute>
          }
        />


        <Route
          path={"/user-dashboard"}
          element={
            <RoleRoute allowedRoles={["Student", "Admin"]} user={user}>
              <Dashboard />
            </RoleRoute>
          }
        />
        <Route
          path={"/complaints"}
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/admin"}
          element={
            <RoleRoute allowedRoles={["Admin", "Staff"]} user={user}>
              <AdminPanel />
            </RoleRoute>
          }
        />

        <Route path={"/register"} element={<Registerpage />} />

        <Route path={"*"} element={<NotFound />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/complaint/:complaintId" element={
          <ProtectedRoute>

            <ComplaintDetail />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default AppRoutes;
