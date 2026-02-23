import { Link } from "react-router-dom";
import { LayoutDashboard, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-6">

      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-10 max-w-2xl w-full text-center space-y-6">

        <h1 className="text-4xl font-bold text-slate-800">
          Welcome to CMS
        </h1>

        <p className="text-slate-600">
          Complaint Management System for handling and tracking complaints efficiently.
        </p>

        <div className="flex justify-center gap-4 pt-4 flex-wrap">

          <Link
            to="/user-dashboard"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition shadow-md"
          >
            <LayoutDashboard size={18} />
            Go to Dashboard
          </Link>

          <Link

            to="/login"
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-800 rounded-xl hover:bg-slate-300 transition"
          >
            <ShieldAlert size={18} />
            Login
          </Link>

        </div>
      </div>
    </div>
  );
}