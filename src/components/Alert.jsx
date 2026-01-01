import { useContext, useState, useEffect } from "react";
import alertContext from "../context/AlertContext";

const Alert = () => {
  const { alertOptions, setAlertOptions } = useContext(alertContext);
  const [hidden, setHidden] = useState(true);
  let styles = {
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
  };
  useEffect(() => {
    setHidden(false);
    let timer = setTimeout(() => {
      setHidden(true);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertOptions]);
  return (
    <div
      className={`absolute top-6 -right-${
        !hidden ? 0 : 90
      } px-4 py-3  text-sm rounded-lg shadow-xl translate-x-10 transition-all duration-300
        ${styles[alertOptions.type]}`}
    >
      {alertOptions.msg ? alertOptions.msg : ""}
    </div>
  );
};

export default Alert;
