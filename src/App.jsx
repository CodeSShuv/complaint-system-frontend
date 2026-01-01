// import apiRequest from "./services/apiClient";
// import { useContext } from "react";
// import { useEffect } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Alert from "./components/Alert";
// import userContext from "./context/UserContext";
const App = () => {
  return (
    <>
      <Navbar />
      <Alert />
      <AppRoutes />
    </>
  );
};

export default App;
