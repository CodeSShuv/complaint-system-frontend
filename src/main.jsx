import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AlertState from "./context/states/AlertState.jsx";
import UserState from "./context/states/UserState.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <AlertState>
        <UserState>
          <App />
        </UserState>
      </AlertState>
    </BrowserRouter>
  </StrictMode>
);
