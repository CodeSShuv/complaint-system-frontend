import { useState, useContext } from "react";
import alertContext from "../context/AlertContext";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../services/apiClient";
const SignupForm = ({ registerUser }) => {
  const { alertOptions, setAlertOptions } = useContext(alertContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);

      let data = await apiRequest({
        method: "POST",
        url: "/auth/signup",
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
      });
      navigate("/login");
      console.log(data)
      setAlertOptions({ type: "success", msg: data.msg });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setAlertOptions({ type: "error", msg: "Registration Failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl p-10 border border-white/40">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
          Create Student Account
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Complaint Management System
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium tracking-wide hover:bg-slate-900 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-600 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-slate-800 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

// {/* <div className="w-full max-w-md backdrop-blur-md bg-white/70 shadow-2xl rounded-2xl p-10 border border-white/40">

//   {/* Title */}
//   <div className="text-center mb-8">
//     <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">
//       Create Student Account
//     </h1>
//     <p className="text-slate-500 text-sm mt-2">
//       Complaint Management System
//     </p>
//   </div>

//   {/* Error */}
//   {error && (
//     <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
//       {error}
//     </div>
//   )}

//   <form onSubmit={handleSubmit} className="space-y-5">

//     {/* Name */}
//     <input
//       type="text"
//       name="name"
//       placeholder="Full name"
//       value={formData.name}
//       onChange={handleChange}
//       required
//       className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
//     />

//     {/* Email */}
//     <input
//       type="email"
//       name="email"
//       placeholder="Email address"
//       value={formData.email}
//       onChange={handleChange}
//       required
//       className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
//     />

//     {/* Password */}
//     <input
//       type="password"
//       name="password"
//       placeholder="Password"
//       value={formData.password}
//       onChange={handleChange}
//       required
//       className="w-full px-4 py-3 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
//     />

//     {/* Button */}
//     <button
//       type="submit"
//       disabled={loading}
//       className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium tracking-wide hover:bg-slate-900 transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-60"
//     >
//       {loading ? "Creating account..." : "Create Account"}
//     </button>
//   </form>

//   {/* Footer */}
//   <p className="text-center text-sm text-slate-600 mt-6">
//     Already have an account?{" "}
//     <Link
//       to="/login"
//       className="text-slate-800 font-medium hover:underline"
//     >
//       Sign in
//     </Link>
//   </p>
// </div> */}
export default SignupForm;
