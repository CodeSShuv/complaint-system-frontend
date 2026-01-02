import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import NotFound from "../pages/NotFound";
import Registerpage from "../pages/Registerpage";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Dashboard from "../pages/Dashboard";
import userContext from "../context/UserContext";

import View from "../pages/View";
const AppRoutes = () => {
  const { user, setUser } = useContext(userContext);
  return (
    <div className="w-screen h-screen pt-16">
      <Routes>
        {/* Public Routes */}
        <Route path={"/"} element={<Homepage />} />
        {!user ? (
          <Route path={"/login"} element={<Loginpage />} />
        ) : (
          <>
            <Route path={"/user-dashboard"} element={<Dashboard />} />
            <Route path={"/complains"} element={<View />} />
          </>
        )}
        <Route path={"/register"} element={<Registerpage />} />

        {/* */}
        <Route path={"*"} element={<NotFound />} />

        {/* private Route */}
        {/* {user ? (
          <>
            <Route path={"/user-dashboard"} element={<Dashboard />} />
          </>
        ) : (
          ""
        )} */}
      </Routes>
    </div>
  );
};

export default AppRoutes;
