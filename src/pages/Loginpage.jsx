import React from "react";
import LoginForm from "../components/LoginForm";

const Loginpage = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center px-4">
      <LoginForm />
    </div>
  );
};

export default Loginpage;
