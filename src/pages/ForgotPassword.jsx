import { useState } from "react";
import { forgotPasswordApi } from "../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }
    try {
      const res = await forgotPasswordApi(email);
      setMessage(res.msg);
    } catch (error) {
      setMessage(error.msg);
    }


  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

        <label className="block mb-2 text-slate-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg outline-none"
          placeholder="Enter your email"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
}