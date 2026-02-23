import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { useContext } from "react";
import userContext from "../context/UserContext";
export default function Unauthorized() {
  const { user } = useContext(userContext);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6">

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-10 max-w-lg w-full text-center space-y-6">

        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <ShieldAlert size={40} className="text-red-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800">
          403 - Unauthorized
        </h1>

        <p className="text-slate-600">
          You do not have permission to access this page.
        </p>

        <Link
          to={`${user?.role === "Student" ? "/user-dashboard" : "/admin"}`}
          className="inline-block px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition shadow-md"
        >
          Back to {user?.role === "Student" ? "user-dashboard" : "Admin Panel"}
        </Link>
      </div>
    </div>
  );
}