import { useState, useContext, useEffect } from "react";
import userContext from "../context/UserContext";
import { loginUser } from "../api/auth.js";
import { Link } from "react-router-dom";
import alertContext from "../context/AlertContext.jsx";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const alertContextOptions = useContext(alertContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      let user = await loginUser(formData);
      setUser(user);

      alertContextOptions.setAlertOptions({
        msg: "User Logged In.",
        type: "success",
      });

      if (user.role === 'Admin' || user.role === 'Staff') {


        navigate("/admin");
      }
      // else if (user.role === 'Student') {
      //   navigate("/user-dashboard");
      // }
    } catch (e) {
      alertContextOptions.setAlertOptions({
        msg: e.msg,
        type: "error",
      });
    }
  };

  return (

    <div className="w-full max-w-md backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl p-10 border border-white/40">

      {/* Logo / Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
          ComplaintMS
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Welcome back 👋
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium tracking-wide hover:bg-slate-900 transition duration-300 shadow-lg hover:shadow-xl"
        >
          Sign In
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-600 mt-6">
        Don’t have an account?{" "}
        <Link
          to={"/register"}
          className="text-slate-800 font-medium hover:underline"
        >
          Create one
        </Link>
        <br />
        <Link
          to={"/forgot-password"}
          className="text-slate-800 font-medium hover:underline ml-4"
        >
          Forgot Password?
        </Link>
      </p>
    </div>

  );
};

export default LoginForm;
