import { useState, useContext, useEffect } from "react";

import SidePanel from "./components/SidePanel.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ManageStaff from "./pages/ManageStaff.jsx";
import View from "../pages/View.jsx";
import userContext from "../context/UserContext";
import ManageUsers from "./pages/ManageUsers.jsx";
export default function AdminPanel() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(userContext);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "staff":
        return <ManageStaff />;
      case "complaints":
        return <View />
      case "user":
        return <ManageUsers />
      default:
        return <Dashboard />;
    }
  };
  const checkAccess = () => {
    if (typeof user?.role === "string" && user?.role === "Admin") {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (!checkAccess()) {
      setActivePage("access-denied");
    }
  }, [user]);
  return (
    typeof user?.role === "string" && user?.role === "Admin" || user?.role === "Super Admin" ? (

      <div className="flex min-h-screen font-sans bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">

        {/* Sidebar */}
        <SidePanel
          activePage={activePage}
          setActivePage={setActivePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">

          {/* Mobile Topbar */}
          <div className="md:hidden p-4 bg-white shadow flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl"
            >
              ☰
            </button>

            <h1 className="font-semibold text-lg capitalize">
              {activePage}
            </h1>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-8">
            {renderPage()}
          </main>
        </div>
      </div>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-red-200 to-red-300">
        <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">Access Denied</h2>
          <p className="text-red-600">You do not have permission to access this page.</p>
        </div>
      </div>
    )
  );
}
