import { useState, useContext } from "react";
import { changePasswordApi } from "../api/auth";
import userContext from "../context/UserContext";
export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(userContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const res = await changePasswordApi(currentPassword, newPassword);


      setMessage(res.msg);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>

        <label className="block mb-2 text-slate-700">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg outline-none"
        />

        <label className="block mb-2 text-slate-700">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg outline-none"
        />

        <label className="block mb-2 text-slate-700">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Change Password
        </button>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
}