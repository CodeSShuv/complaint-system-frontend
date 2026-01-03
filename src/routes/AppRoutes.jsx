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
const AppRoutes = () => {
  return (
    <div className="w-screen h-screen pt-16">
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
          path={"/complains"}
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />

        <Route path={"/register"} element={<Registerpage />} />

        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
