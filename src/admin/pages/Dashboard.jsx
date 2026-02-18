export default function Dashboard() {
  // placeholder data for now
  const stats = {
    totalStaff: 12,
    totalComplaints: 34,
    totalDepartments: 4,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30 hover:shadow-2xl transition">
            <h2 className="text-lg font-medium text-slate-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</h2>
            <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/30">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition shadow-md">
            Create Staff
          </button>
          <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition shadow-md">
            View Complaints
          </button>
        </div>
      </div>
    </div>
  );
}
