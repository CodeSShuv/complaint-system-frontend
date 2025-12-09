import { useState } from "react";
import alertContext from "../AlertContext";
const AlertState = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <alertContext.Provider value={{ showAlert, setShowAlert }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
