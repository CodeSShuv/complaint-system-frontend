// import apiRequest from "./services/apiClient";
// import { useContext } from "react";
// import { useEffect } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Alert from "./components/Alert";
import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import userContext from "./context/UserContext";
const App = () => {
  const { user, setUser } = useContext(userContext);
  const [authCheck, setAuthCheck] = useState(false);
  const fetchUser = async () => {
    try {
      const data = await apiRequest({
        method: "GET",
        url: "http://localhost:8080/auth/user",
      });

      // console.log(data.data.user);
      setUser(data.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthCheck(true);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  if (authCheck) return null;
  return (
    <>
      <Navbar />
      <Alert />
      <AppRoutes />
    </>
  );
};

export default App;
