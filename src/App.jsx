import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Alert from "./components/Alert";
import { useContext, useEffect, useState } from "react";
import userContext from "./context/UserContext";
// import alertContext from "./context/AlertContext";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "./api/auth.js";
const App = () => {
  const { user, setUser } = useContext(userContext);
  const [authCheck, setAuthCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      fetchUser().then((user) => {
        if (user) {
          setUser(user);
        }
        setAuthCheck(true);
      });
    } else {
      if (user.role === 'Admin') {
        navigate("/admin");
      } else if (user.role === 'Staff' || user.role === 'Student') {
        navigate("/user-dashboard");
      }
    }
  }, [user]);
  if (!authCheck) return null;
  return (
    <>
      {user != null ? user.role === 'Admin' ? "" : <Navbar /> : <Navbar />}
      <Alert />
      <AppRoutes />
    </>
  );
};

export default App;
