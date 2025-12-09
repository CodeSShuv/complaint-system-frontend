import apiRequest from "./services/apiClient";
import { useContext } from "react";
// import { useEffect } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import userContext from "./context/UserContext";
const App = () => {
  return (
    <>
      {/* <Alert /> */}
      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
