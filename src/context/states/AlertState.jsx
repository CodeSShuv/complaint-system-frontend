import { useState } from "react";
import alertContext from "../AlertContext";
const AlertState = (props) => {
  const [alertOptions, setAlertOptions] = useState({
    msg: null,
    type: null,
  });
  return (
    <alertContext.Provider value={{ alertOptions, setAlertOptions }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
