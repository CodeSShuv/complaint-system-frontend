import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import NotFound from "../pages/NotFound";
import Registerpage from "../pages/Registerpage";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Dashboard from "../pages/Dashboard";
import userContext from "../context/UserContext";

import View from "../pages/View";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminPanel from "../admin/AdminPanel";
import VerifyEmail from "../pages/EmailVerificationPage";
const AppRoutes = () => {
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
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
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
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route path={"/register"} element={<Registerpage />} />

        <Route path={"*"} element={<NotFound />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
