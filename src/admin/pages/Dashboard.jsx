import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchStats } from "../../api/admin";
import alertContext from "../../context/AlertContext";
export default function Dashboard({ user }) {
  const { setAlertOptions } = useContext(alertContext);
  const [stats, setStats] = useState({
    totalAdmin: 0,
    totalComplaints: 0,
    pendingComplaints: 0,
    fulfilledComplaints: 0,
    activeComplaints: 0,
    totalStudents: 0,
  });
  // placeholder data for now
  // const stats = {
  //   totalAdmin: 12,
  //   totalComplaints: 34,
  //   pendingComplaints: 5,
  //   fulfilledComplaints: 25,
  //   activeComplaints: 4,
  //   totalUsers: 120,
  // };
  useEffect(() => {
    fetchStats().then((data) => {
      if (data.length === 0) {
        return

      } else {
        setStats(data);
        console.log("Fetched stats:", data);
      }
    }).catch((e) => {
      setAlertOptions({
        msg: e.msg || "Failed to fetch dashboard stats.",
        type: "error",
      });
    })
  }, []);
  return (
    <div className="space-y-6">

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-slate-800">
          Dashboard
        </h1>

        {/* Admin Info */}
        <div className="bg-white/70 backdrop-blur-md px-5 py-3 rounded-xl shadow border border-white/30">
          <p className="text-sm text-slate-500">Logged in as</p>
          {console.log(user)}
          <p className="font-semibold text-slate-800">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-slate-600">{user?.role}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30 hover:shadow-2xl transition"
          >
            <h2 className="text-lg font-medium text-slate-700 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </h2>
            <p className="text-3xl font-bold text-slate-800 mt-2">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          {/* <Link className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition shadow-md">
            Create Admin
          </Link> */}
          {/* <Link className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition shadow-md"
            to={"/"}>
            View Complaints
          </Link> */}
          <Link className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition shadow-md"
            to={"/change-password"}>
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}